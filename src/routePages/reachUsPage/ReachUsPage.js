import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./ReachUsPage.css";

const ReachUsPage = () => {
  return (
    <div>
      <Navbar notHome />
      <main>
        <div className="reachUs__section section__sha-bor-pad">
          <h3>Reach us @</h3>
          <div className="reachUs__container">
            <div className="reachUs__content content__card">
              <p className="br__padding__bottom">
                <strong className="grey__text">Address</strong>
              </p>
              <p className="br__padding__bottom">
                Random street, No-4 avenue, Random State, Country.
              </p>
              <p className="br__padding__bottom">
                <i className="fas fa-mobile-alt "></i>
                <span> </span> 1234567890
              </p>
              <p className="br__padding__bottom">
                Mail to:<span> </span>
                <a href="mailto:nandukishore003@gmail.com">
                  <i className="fas fa-envelope fa-lg pointer"></i>
                </a>
              </p>
              <hr />
              <p className="br__padding__top">
                <strong className="grey__text">Working Hours</strong>
              </p>
              <p className="br__padding__top">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="reachUs__googleMap content__card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.890689974453!2d77.59746111413526!3d12.978842718232611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1664d3619b53%3A0xc13769784709aec!2sM%20Chinnaswamy%20Stadium!5e0!3m2!1sen!2sin!4v1636951779118!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen=""
                // loading="lazy"
                title="maplecake bakery location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReachUsPage;
