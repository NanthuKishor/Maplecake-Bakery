import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import FloatingButton from "../../components/floatingActionButton/FloatingButton";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { ordersFetch } from "../../features/ordersSlice";
import "./AdminOrderPage.css";
import OrdersComponent from "./OrdersComponent";

const DeliveredOrderPage = () => {
  const dispatch = useDispatch();
  const { deliveredOrders, deliveredOrdersCount, status, error } = useSelector(
    (state) => state.orders
  );
  console.log(deliveredOrders);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(ordersFetch());
    console.log("dispatched");
  }, [dispatch]);
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
          <h3>Delivered Orders({deliveredOrdersCount})</h3>
          {status ? (
            <LoadingBar />
          ) : error ? (
            <h3 clasname="error">{error}</h3>
          ) : deliveredOrders.length === 0 ? (
            <h3 className="success">No Delivered Orders available.</h3>
          ) : (
            deliveredOrders
              ?.map((data) => <OrdersComponent key={data?.id} data={data} />)
              .reverse()
          )}
        </div>
      </main>
    </div>
  );
};

export default DeliveredOrderPage;
