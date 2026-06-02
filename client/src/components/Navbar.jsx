import "./Navbar.css";
import logo from "../assets/utkal-logo.png";

const Navbar = () => {
  return (
    <header className="navbar">

      <div className="navbar-container">
        <div className="navbar-left">

          <img
            src={logo}
            alt="Hospital Logo"
            className="navbar-logo-image"
          />

          <div>

            <h1 className="navbar-title">
              Hospital Feedback System
            </h1>

           <p className="navbar-subtitle">
  Your Valuable Feedback Helps Us Deliver Better Healthcare Services
</p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;