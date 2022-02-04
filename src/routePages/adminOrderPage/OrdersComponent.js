import CustomerDetails from "./CustomerDetails";
import ItemsDetails from "./ItemsDetails";
import Button from "@mui/material/Button";

const OrdersComponent = ({ data, handleClick }) => {
  return (
    <div className="newOrder__content content__card">
      <div className="newOrder__deliveryMode">
        <p>
          <strong>Delivery type</strong>
        </p>
        {data?.delivery_mode === "visit-store" ? (
          <p className="success">Visit store</p>
        ) : (
          <p className="success">Home delivery</p>
        )}
      </div>
      <div className="newOrder__details">
        <div className="details__orderTime">
          <p>
            <strong>Ordered on</strong>
          </p>
          <p className="success">
            {data?.timeStamp?.toDate().toDateString()} +{" "}
            {data?.timeStamp?.toDate().toLocaleTimeString("en-US")}
          </p>
        </div>
        <div className="details__customer">
          <p>
            <strong>Customer</strong>
          </p>
          <div>
            <CustomerDetails
              title="Name"
              content={data?.customer_details?.name}
              className="customer__name"
            />
            <CustomerDetails
              title="Email"
              content={data?.customer_details?.email}
              className="customer__email"
            />
            <CustomerDetails
              title="Phone"
              content={data?.customer_details?.phone}
              className="customer__phone"
            />
            {data.delivery_mode === "home-delivery" ? (
              <CustomerDetails
                title="Address"
                content={data?.customer_details?.address}
                className="customer__address"
              />
            ) : null}
          </div>
        </div>
        <div className="details__items">
          <p>
            <strong>Items ordered</strong>
          </p>
          <div>
            {data?.items_ordered?.map((item) => (
              <ItemsDetails
                key={item?.item_id}
                src={item?.item_image}
                name={item?.item_name}
                qty={item?.item_quantity}
                price={item?.item_price}
              />
            ))}
          </div>
        </div>
        <div className="details__payment">
          <p>
            <strong>Payment Details</strong>
          </p>
          <div>
            <CustomerDetails
              title="Payment status"
              content={data?.payment_details?.payment_status}
              className="payment__status"
            />
            <CustomerDetails
              title="Amount Paid"
              content={`$${data?.payment_details?.payment_amount?.toFixed(2)}`}
              className="payment__amount"
            />
          </div>
        </div>
        <div className="details__delivered">
          <p>
            <strong>Delivery Status</strong>
          </p>
          <p className={data?.delivered ? "success" : "error"}>
            <strong>{data?.delivered ? "Delivered" : "Not delivered"}</strong>
          </p>
        </div>
        {data?.delivered_time ? (
          <div className="details__deliveredTime">
            <p>
              <strong>Delivered on</strong>
            </p>
            <p className="success">
              {data?.delivered_time?.toDate().toDateString()} +{" "}
              {data?.delivered_time?.toDate().toLocaleTimeString("en-US")}
            </p>
          </div>
        ) : null}
      </div>
      <div className="newOrder__deliveredButton">
        <Button
          key={data?.id}
          type="submit"
          color="secondary"
          variant="contained"
          size="small"
          disabled={data?.delivered ? true : false}
          sx={{
            fontSize: 12,
          }}
          onClick={() => handleClick(data?.id)}
        >
          Delivered
        </Button>
      </div>
    </div>
  );
};

export default OrdersComponent;
