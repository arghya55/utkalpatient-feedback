import { useEffect, useState } from "react";
import API from "../service/api";
import "../styles/Doctoranalytics.css";

const DoctorAnalytics = () => {

  const [data, setData] =
    useState([]);

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

    <div className="analytics-grid">

      {data.map((doctor) => (

        <div
          key={doctor.doctorName}
          className="analytics-card"
        >

          <h2 className="doctor-name">
            👨‍⚕️ {doctor.doctorName}
          </h2>

          <div className="stats-grid">

            <div className="stat-box total">
              <h3>Total Feedback</h3>
              <p>{doctor.totalFeedback}</p>
            </div>

            <div className="stat-box rating">
              <h3>Average Rating</h3>
              <p>⭐ {doctor.averageRating}</p>
            </div>

            <div className="stat-box excellent">
              <h3>Excellent</h3>
              <p>{doctor.excellent}</p>
            </div>

            <div className="stat-box good">
              <h3>Good</h3>
              <p>{doctor.good}</p>
            </div>

            <div className="stat-box fair">
              <h3>Fair</h3>
              <p>{doctor.fair}</p>
            </div>

            <div className="stat-box improve">
              <h3>Needs Improvement</h3>
              <p>{doctor.needsImprovement}</p>
            </div>

            <div className="stat-box poor">
              <h3>Poor</h3>
              <p>{doctor.poor}</p>
            </div>

          </div>

          <div className="comments-box">

            <h3 className="comments-title">
              Recent Comments
            </h3>

            {doctor.comments?.length > 0 ? (

              <ul className="comment-list">

                {doctor.comments
                  .slice(-5)
                  .map((comment, index) => (

                    <li key={index}>
                      {comment}
                    </li>

                  ))}

              </ul>

            ) : (

              <p className="no-comment">
                No Comments Available
              </p>

            )}

          </div>

        </div>

      ))}

    </div>

  </div>
);
};

export default DoctorAnalytics;