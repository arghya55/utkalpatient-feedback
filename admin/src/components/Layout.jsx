import Sidebar from "../components/Sidebar";
import Header from "../components/AdminNavbar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;