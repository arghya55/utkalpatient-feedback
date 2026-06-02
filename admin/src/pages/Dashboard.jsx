import { useEffect, useState } from "react";
import API from "../service/api";
import DashboardCard from "../components/DashboardCard";
import "../styles/Dashboard.css";

const Dashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    opd: 0,
    ipd: 0,
    general: 0,
  });

  const getData = async () => {

    const res = await API.get("/feedback");

    const data = res.data;

    setStats({
      total: data.length, 
      opd: data.filter(x=>x.type==="OPD").length,
      ipd: data.filter(x=>x.type==="IPD").length,
      general: data.filter(x=>x.type==="GENERAL").length
    });
  };

  useEffect(()=>{
    getData();

    const interval =
      setInterval(getData,3000);

    return ()=>clearInterval(interval);

  },[]);

  return (
    <>
      <h1 className="page-title">
        Dashboard
      </h1>

      <div className="dashboard-grid">

        <DashboardCard
          title="Total Feedback"
          value={stats.total}
        />

        <DashboardCard
          title="OPD Feedback"
          value={stats.opd}
        />

        <DashboardCard
          title="IPD Feedback"
          value={stats.ipd}
        />

        <DashboardCard
          title="General Feedback"
          value={stats.general}
        />

      </div>
    </>
  );
};

export default Dashboard;