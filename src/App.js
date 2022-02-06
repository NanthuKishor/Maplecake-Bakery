import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "./components/loadingBar/LoadingBar";
import HomePage from "./routePages/homePage/HomePage";
import CakeDetailsPage from "./routePages/cakeDetailsPage/CakeDetailsPage";
import RemoveModal from "./components/modals/RemoveModal";
import CheckoutPage from "./routePages/checkoutPage/CheckoutPage";
import PaymentResultPage from "./routePages/paymentPages/PaymentResultPage";
import { useEffect } from "react";
import { updateCartNumbers } from "./features/cartSlice";
import { useDispatch } from "react-redux";
import DeleteModal from "./components/modals/DeleteModal";
import ModifyModal from "./components/modals/ModifyModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { addAdmin, removeAdmin } from "./features/authSlice";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import ForgotPasswordModal from "./components/modals/ForgotPasswordModal";
import AdminProfilePage from "./routePages/adminProfilePage/AdminProfilePage";
import DeleteOrderModal from "./components/modals/DeleteOrderModal";
const PageNotFound = React.lazy(() =>
  import("./routePages/pageNotFound/PageNotFound")
);
const NewOrderPage = React.lazy(() =>
  import("./routePages/adminOrderPage/NewOrderPage")
);
const DeliveredOrderPage = React.lazy(() =>
  import("./routePages/adminOrderPage/DeliveredOrderPage")
);
const ModifyProductPage = React.lazy(() =>
  import("./routePages/adminProductPage/ModifyProductPage")
);
const AddProductPage = React.lazy(() =>
  import("./routePages/adminProductPage/AddProductPage")
);
const AdminLoginPage = React.lazy(() =>
  import("./routePages/adminLoginPage/AdminLoginPage")
);
const CakesPage = React.lazy(() => import("./routePages/cakesPage/CakesPage"));
const CartPage = React.lazy(() => import("./routePages/cartPage/CartPage"));
const ReachUsPage = React.lazy(() =>
  import("./routePages/reachUsPage/ReachUsPage")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCartNumbers());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(addAdmin(uid));
      } else {
        dispatch(removeAdmin());
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer
        className="toastify__fontSize"
        position="bottom-right"
        theme="dark"
        autoClose={3000}
      />
      <div className="grid__container">
        <Routes>
          <Route
            path="/a/admin/profile"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ProtectedRoutes>
                  <AdminProfilePage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/products/modify"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ProtectedRoutes>
                  <ModifyProductPage />
                </ProtectedRoutes>
              </Suspense>
            }
          >
            <Route
              path="delete/:id"
              element={
                <ProtectedRoutes>
                  <DeleteModal />
                </ProtectedRoutes>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoutes>
                  <ModifyModal />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route
            path="/a/admin/products"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ProtectedRoutes>
                  <AddProductPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/orders"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ProtectedRoutes>
                  <NewOrderPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/orders/delivered"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ProtectedRoutes>
                  <DeliveredOrderPage />
                </ProtectedRoutes>
              </Suspense>
            }
          >
            <Route
              path="delete-order/:id"
              element={
                <ProtectedRoutes>
                  <DeleteOrderModal />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route
            path="/a/admin-login"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <AdminLoginPage />
              </Suspense>
            }
          >
            <Route path="reset-password" element={<ForgotPasswordModal />} />
          </Route>
          <Route
            path="/s/payment"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <PaymentResultPage />
              </Suspense>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/cakes"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <CakesPage />
              </Suspense>
            }
          />
          <Route path="/cakes/:id" element={<CakeDetailsPage />} />
          <Route
            path="/cart"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <CartPage />
              </Suspense>
            }
          >
            <Route path="remove/:id" element={<RemoveModal />} />
          </Route>
          <Route
            path="/reach-us"
            element={
              <Suspense
                fallback={
                  <div className="loadingBarCenter">
                    <LoadingBar />
                  </div>
                }
              >
                <ReachUsPage />
              </Suspense>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
