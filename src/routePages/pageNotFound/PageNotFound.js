import "../adminLoginPage/AdminLoginPage.css";
import "../checkoutPage/CheckoutPage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  let navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <main>
        <div className="adminLogin__section section__sha-bor-pad column__flex">
          <h2 className="error">404 Error</h2>
          <h3>Page Not Found</h3>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            sx={{
              fontSize: 11,
              marginTop: 1,
            }}
            onClick={handleHomePageClick}
          >
            Home Page
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
