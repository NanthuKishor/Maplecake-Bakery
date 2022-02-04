import "./CakesPage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoadingBar from "../../components/loadingBar/LoadingBar";

const CakesPage = () => {
  //fetching data from the redux store.
  const {
    items: allCakes,
    status,
    error,
  } = useSelector((state) => state.cakes);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //to navigate to the cake details page.
  let navigate = useNavigate();
  const viewCadeDetailsHandler = (selectedCake) => {
    navigate(`/cakes/${selectedCake?.id}`);
  };

  return (
    <div>
      <Navbar notHome />
      <main>
        <div className="cakes__section section__sha-bor-pad">
          <h3>All Cakes</h3>
          <div className="cakes__contentDiv row__flex">
            {status ? (
              <LoadingBar />
            ) : error ? (
              <h3 className="error">{error}</h3>
            ) : (
              allCakes?.map((cake) => (
                <div
                  key={cake?.id}
                  className="cakes__content column__flex cakeCard__shadow pointer"
                  onClick={() => viewCadeDetailsHandler(cake)}
                >
                  <div className="imgDiv__19rem row__flex">
                    <img
                      className="img__max"
                      src={cake?.image}
                      alt={cake?.name}
                    />
                  </div>
                  <div className="cakesContent__body column__flex">
                    <p>{cake?.name}</p>
                    <p>${cake?.price?.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CakesPage;
