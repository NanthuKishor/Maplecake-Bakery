import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer__section">
        <div id="footer" className="footer__div">
          <div className="footer__legals">
            <p className="br__padding__bottom">
              <strong>Legal</strong>
            </p>
            <p className="grey__color">Privacy Policy</p>
            <p className="grey__color pointer">Terms & Conditions</p>
            <p className=" admin ">
              <Link to="/a/admin-login" className="grey__color pointer">
                Admin
              </Link>
            </p>
          </div>
          <div className="footer__socialLinks">
            <div>
              <p>
                <strong>Follow us</strong>
              </p>
            </div>
            <div className="footer__socialIcons">
              <i className="fab fa-facebook-square pointer"></i>
              <i className="fab fa-instagram pointer"></i>
              <i className="fab fa-twitter-square fa-2x pointer"></i>
            </div>
          </div>
        </div>
        <div className="copyright__div">
          <span>&copy; {year} rNk.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
