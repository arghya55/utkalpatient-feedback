import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import utlogo from '../assets/utkal-logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={utlogo} alt="Utkal Hospital Logo" className="logo" />
{/* 
      <Link to="/dashboard">
        📊 Dashboard
      </Link> */}

      <Link to="/opd-feedback">
        🏥 OPD Feedback
      </Link>

      <Link to="/ipd-feedback">
        🛏️ IPD Feedback
      </Link>

      <Link to="/general-feedback">
        ⭐ General Feedback
      </Link>

      <Link to="/doctor-analytics">
        🩺 Doctor Analytics
      </Link>

      <Link to="/analytics">
        📈 Analytics
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location = "/";
        }}
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;