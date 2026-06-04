import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";
import "../styles/Doctoranalytics.css";

const DoctorAnalytics = () => {

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const res =
        await API.get(
          "/analytics/doctor-analytics"
        );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="analytics-page">

      <h1 className="analytics-title">
        Doctor Wise Analytics Dashboard
      </h1>

      <div className="doctor-list">

        {data.map((doctor) => (

          <div
            key={doctor.doctorName}
            className="doctor-card"
          >

            <h2>
              👨‍⚕️ {doctor.doctorName}
            </h2>

            <p>
              ⭐ {doctor.averageRating}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/doctor/${encodeURIComponent(
                    doctor.doctorName
                  )}`
                )
              }
            >
              View Analytics
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default DoctorAnalytics;