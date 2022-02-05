import { useEffect } from "react";
import "./HomePage.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const HomePage = () => {
  //fetching all cakes details from redux store.
  const {
    items: allCakes,
    status,
    error,
  } = useSelector((state) => state.cakes);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //navigate to the cakesDetails page.
  let navigate = useNavigate();
  const viewCakeDetailsHandler = (selectedCake) => {
    navigate(`/cakes/${selectedCake?.id}`);
  };
  //take to the cakes page.
  const handleSeeMoreClick = () => {
    navigate("/cakes");
  };

  return (
    <div>
      <Navbar />
      <Header />
      <main>
        <div className="home__section column__flex section__sha-bor-pad">
          <h3>what's new ?</h3>
          <div className="home__productsDiv row__flex">
            {status ? (
              <LoadingBar />
            ) : error ? (
              <h3 className="error">{error}</h3>
            ) : (
              allCakes
                ?.map((cake) => (
                  <div
                    key={cake?.id}
                    className="home__content column__flex cakeCard__shadow pointer"
                    onClick={() => viewCakeDetailsHandler(cake)}
                  >
                    <div className="imgDiv__19rem row__flex">
                      <img
                        className="img__max"
                        src={cake?.image}
                        alt={cake?.name}
                      />
                    </div>
                    <div className="homeContent__body">
                      <p>{cake?.name}</p>
                    </div>
                  </div>
                ))
                .reverse()
                .slice(0, 3)
            )}
          </div>

          <Button
            type="submit"
            color="secondary"
            variant="outlined"
            size="small"
            sx={{
              fontSize: 11,
              textTransform: "capitalize",
            }}
            onClick={handleSeeMoreClick}
          >
            See more...
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
