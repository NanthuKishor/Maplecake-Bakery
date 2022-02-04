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
              <Suspense fallback={<LoadingBar />}>
                <ProtectedRoutes>
                  <AdminProfilePage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/products/modify"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ProtectedRoutes>
                  <ModifyProductPage />
                </ProtectedRoutes>
              </Suspense>
            }
          >
            <Route path="delete/:id" element={<DeleteModal />} />
            <Route path="modify/:id" element={<ModifyModal />} />
          </Route>
          <Route
            path="/a/admin/products"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ProtectedRoutes>
                  <AddProductPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/orders"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ProtectedRoutes>
                  <NewOrderPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin/orders/delivered"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ProtectedRoutes>
                  <DeliveredOrderPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/a/admin-login"
            element={
              <Suspense fallback={<LoadingBar />}>
                <AdminLoginPage />
              </Suspense>
            }
          >
            <Route path="reset-password" element={<ForgotPasswordModal />} />
          </Route>
          <Route
            path="/s/payment"
            element={
              <Suspense fallback={<LoadingBar />}>
                <PaymentResultPage />
              </Suspense>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/cakes"
            element={
              <Suspense fallback={<LoadingBar />}>
                <CakesPage />
              </Suspense>
            }
          />
          <Route path="/cakes/:id" element={<CakeDetailsPage />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<LoadingBar />}>
                <CartPage />
              </Suspense>
            }
          >
            <Route path="remove/:id" element={<RemoveModal />} />
          </Route>
          <Route
            path="/reach-us"
            element={
              <Suspense fallback={<LoadingBar />}>
                <ReachUsPage />
              </Suspense>
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
