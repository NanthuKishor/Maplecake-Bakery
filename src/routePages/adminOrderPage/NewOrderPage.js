import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import FloatingButton from "../../components/floatingActionButton/FloatingButton";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { ordersFetch } from "../../features/ordersSlice";
import "./AdminOrderPage.css";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import OrdersComponent from "./OrdersComponent";

const NewOrderPage = () => {
  const dispatch = useDispatch();
  const { newOrders, newOrdersCount, status, error } = useSelector(
    (state) => state.orders
  );
  console.log(newOrders);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(ordersFetch());
    console.log("dispatched");
  }, [dispatch]);

  const handleDeliveredClick = async (id) => {
    const ordersRef = doc(db, "orders", id);
    await updateDoc(ordersRef, {
      delivered: true,
      delivered_time: serverTimestamp(),
    }).then(() => {
      dispatch(ordersFetch());
      toast.success("Successfully updated Delivery Status");
    });
  };

  return (
    <div>
      <AdminNavbar />
      <main>
        <div className="order__section section__sha-bor-pad">
          <div className="floatingButton__div">
            <FloatingButton link="/a/admin/orders" children="New Orders" />
            <FloatingButton
              link="/a/admin/orders/delivered"
              children="Delivered Orders"
            />
          </div>
          <h3>New Orders({newOrdersCount})</h3>
          {status ? (
            <LoadingBar />
          ) : error ? (
            <h3 clasname="error">{error}</h3>
          ) : newOrders.length === 0 ? (
            <h3 className="success">No New Orders available.</h3>
          ) : (
            newOrders?.map((data) => (
              <OrdersComponent
                key={data?.id}
                data={data}
                handleClick={handleDeliveredClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NewOrderPage;
