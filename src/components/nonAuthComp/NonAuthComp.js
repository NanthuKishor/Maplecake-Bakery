import "../../routePages/cakeDetailsPage/CakeDetailsPage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NonAuthComp = () => {
  let navigate = useNavigate();

  return (
    <div className="cakeDetails__section section__sha-bor-pad nonAuthComp">
      <h3>You'r not Authenticated to access this page.</h3>
      <p>If you'r the Admin, kindly Login for access</p>
      <div className="row__flex nonAuthComp__gap">
        <Button
          color="secondary"
          variant="contained"
          size="small"
          sx={{
            fontSize: 11,
            marginTop: 1,
          }}
          onClick={() => navigate("/a/admin-login", { replace: true })}
        >
          Login
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            fontSize: 11,
            marginTop: 1,
          }}
          onClick={() => navigate("/", { replace: true })}
        >
          Home Page
        </Button>
      </div>
    </div>
  );
};

export default NonAuthComp;
