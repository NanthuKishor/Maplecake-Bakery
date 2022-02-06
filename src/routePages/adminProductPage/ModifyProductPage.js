import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import FloatingButton from "../../components/floatingActionButton/FloatingButton";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import "./AdminProductPage.css";
import Button from "@mui/material/Button";
import { useNavigate, Outlet } from "react-router-dom";
import { cakesFetch } from "../../features/cakesSlice";

const ModifyProductPage = () => {
  const { items, status, error } = useSelector((state) => state.cakes);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(cakesFetch());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    navigate(`delete/${id}`);
  };

  const handleModifyClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <div>
      <AdminNavbar />
      <main>
        <div className="products__section section__sha-bor-pad">
          <div className="floatingButton__div">
            <FloatingButton
              link="/a/admin/products"
              children="Add New Products"
            />
            <FloatingButton
              link="/a/admin/products/modify"
              children="Modify Products"
            />
          </div>
          <h3>Modify Products({items?.length})</h3>
          <Outlet />
          {status ? (
            <LoadingBar />
          ) : error ? (
            <h3 clasname="error">{error}</h3>
          ) : items.length !== 0 ? (
            items
              ?.map((item) => (
                <div key={item?.id} className="product__div content__card">
                  <div className="product__img-button">
                    <div className="product__image">
                      <img
                        className="img__max"
                        src={item?.image}
                        alt={item?.name}
                      />
                    </div>
                    <div className="modifyProduct__buttons">
                      <Button
                        type="submit"
                        color="secondary"
                        size="small"
                        sx={{
                          fontSize: 10,
                          marginTop: 2,
                        }}
                        onClick={() => handleDeleteClick(item?.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        size="small"
                        sx={{
                          fontSize: 10,
                          marginTop: 2,
                        }}
                        onClick={() => handleModifyClick(item?.id)}
                      >
                        Modify
                      </Button>
                    </div>
                  </div>
                  <div className="product__content">
                    <p>
                      <strong className="grey__text">Name: </strong>
                      {item?.name}
                    </p>
                    <p>
                      <strong className="grey__text">Price: </strong>$
                      {item?.price?.toFixed(2)}
                    </p>
                    <p className="product__description">
                      <strong className="grey__text">Description: </strong>{" "}
                      {item?.description}
                    </p>
                    <p className="success">
                      <strong className="grey__text">Added on: </strong>
                      {item?.timeStamp?.toDate().toDateString()} +{" "}
                      {item?.timeStamp?.toDate().toLocaleTimeString("en-US")}
                    </p>
                  </div>
                </div>
              ))
              .reverse()
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default ModifyProductPage;
