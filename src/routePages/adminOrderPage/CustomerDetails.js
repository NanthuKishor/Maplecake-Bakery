const CustomerDetails = ({ title, content, className }) => {
  return (
    <div className={className}>
      <p className="grey__text">
        <strong>{title}: </strong>
      </p>
      <p>{content}</p>
    </div>
  );
};

export default CustomerDetails;
