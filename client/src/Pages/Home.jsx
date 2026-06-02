  import { Link } from "react-router-dom";
  import "./Home.css";

  const Home = () => {
    return (
      <div className="home-page">

        <div className="home-overlay">

          <div className="home-card">

            <h1 className="home-title">
              Utkal Hospital Feedback System
            </h1>

            <p className="home-subtitle">
              Your feedback helps us to improve our service
            </p>

            <div className="home-btn-group">

              <Link to="/opd-feedback">
                <button className="home-btn opd-btn">
                  OPD Feedback
                </button>
              </Link>

              <Link to="/ipd-feedback">
                <button className="home-btn ipd-btn">
                  IPD Feedback
                </button>
              </Link>

              <Link to="/gnrl-feedback">
                <button className="home-btn gnrl-btn">
                  General Feedback
                </button>
              </Link>

            </div>

          </div>

        </div>

      </div>
    );
  };

  export default Home;