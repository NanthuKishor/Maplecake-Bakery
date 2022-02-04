import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCartNumbers } from "../../features/cartSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";

const Navbar = (props) => {
  //fetching cart qty from redux store.
  const { cartItemNumber } = useSelector((state) => state.cart);

  //handle local state.
  const [toggle, setToggle] = useState(false);
  const [scrollColor, setScrollColor] = useState(false);

  //listen to screen resize.
  const resizeScreen = () => {
    if (window.innerWidth >= 900) {
      setToggle(false);
    }
  };

  //to change the navbar background.
  const scrollYHandler = () => {
    if (window.scrollY >= 48) {
      setScrollColor(true);
    } else {
      setScrollColor(false);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCartNumbers());
    window.addEventListener("resize", resizeScreen);
    window.addEventListener("scroll", scrollYHandler);

    return () => {
      window.removeEventListener("resize", resizeScreen);
      window.removeEventListener("scroll", scrollYHandler);
    };
  });

  //click handlers.
  const toggleClickHandler = () => {
    setToggle(!toggle);
  };
  const toggleOffClickHandler = () => {
    setToggle(false);
  };

  return (
    <nav
      className={
        scrollColor
          ? "navbar navbar__transition scroll__background"
          : "navbar navbar__transition"
      }
    >
      <div
        className={toggle ? "overlay" : null}
        onClick={() => toggleOffClickHandler()}
      ></div>
      <div
        className={
          props.notHome
            ? "navbar__section notHome__background"
            : "navbar__section transparent__bg"
        }
      >
        <div className="navbar__brand">
          <NavLink to="/" className="link__whiteColor">
            Maplecake Bakery
          </NavLink>
        </div>
        <div
          className={
            toggle ? "navbar__menu__ul__active toggle__bg" : "navbar__menu__ul"
          }
        >
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : null,
                })}
                className="link__whiteColor"
                onClick={() => toggleOffClickHandler()}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cakes"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : null,
                })}
                className="link__whiteColor"
                onClick={() => toggleOffClickHandler()}
              >
                Cakes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reach-us"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : null,
                })}
                className="link__whiteColor"
                onClick={() => toggleOffClickHandler()}
              >
                Reach-Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar__menu__cart">
          <NavLink
            to="/cart"
            style={({ isActive }) => ({ color: isActive ? "yellow" : null })}
            className="link__whiteColor"
          >
            <Badge
              badgeContent={cartItemNumber}
              sx={{
                "& .MuiBadge-badge": {
                  top: 22,
                  right: 25,
                  backgroundColor: "black",
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                  border: " 1px solid white",
                },
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="large" />
            </Badge>
          </NavLink>
        </div>

        <div
          className="navbar__menu__toggle pointer"
          onClick={() => toggleClickHandler()}
        >
          {toggle ? (
            <i className="fas fa-times fa-lg link__whiteColor"></i>
          ) : (
            <i className="fas fa-bars fa-lg link__whiteColor"></i>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
