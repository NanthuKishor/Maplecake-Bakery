import { useNavigate } from "react-router-dom";
import "./FloatingButton.css";

const FloatingButton = ({ link, children }) => {
  const pathName = window.location.pathname;

  let navigate = useNavigate();
  const linkClickHandler = () => {
    navigate(link, { replace: true });
  };
  return (
    <div
      className={
        link === pathName
          ? "floatingButton__activeLink floatingButton pointer"
          : "floatingButton__Link floatingButton pointer"
      }
      onClick={linkClickHandler}
    >
      {children}
    </div>
  );
};

export default FloatingButton;
