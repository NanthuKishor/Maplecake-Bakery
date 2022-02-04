const ItemsDetails = ({ src, name, qty, price }) => {
  return (
    <div className="items__ordered">
      <div className="ordered__image row__flex">
        <img className="img__max" src={src} alt={name} />
      </div>
      <div className="ordered__details">
        <p>
          <strong className="grey__text">Name: </strong>
          {name}
        </p>
        <p>
          <strong className="grey__text">Quantity: </strong>
          {qty}
        </p>
        <p>
          <strong className="grey__text">Price: </strong>${price.toFixed(2)}
        </p>
        <p>
          <strong className="grey__text">Total: </strong>$
          {(price * qty).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemsDetails;
