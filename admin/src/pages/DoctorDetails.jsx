import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/DoctorDetails.css';
import API from "../service/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from "recharts";

const DoctorDetails = () => {

    const { doctorName } = useParams();

    const [graphType, setGraphType] =
useState("monthly");

    const [doctor, setDoctor] =
        useState(null);

    useEffect(() => {

        loadDoctor();

    }, []);

    const loadDoctor = async () => {

  try {

    const res =
    await API.get(
      "/analytics/doctor-analytics"
    );

    const selected =
    res.data.find(
      d =>
      d.doctorName?.toUpperCase() ===
      decodeURIComponent(
        doctorName
      ).toUpperCase()
    );

    console.log(res.data);

    console.log(selected);

    setDoctor(selected);

  } catch(error){

    console.log(error);

  }

};

    if (!doctor)
        return <h2>Loading...</h2>;

   const graphData =
graphType === "daily"
? doctor?.dailyData || []
: graphType === "weekly"
? doctor?.weeklyData || []
: graphType === "yearly"
? doctor?.yearlyData || []
: doctor?.monthlyData || [];

    return (

  <div className="details-page">

    <div className="doctor-profile-card">

      <div className="doctor-header">

        <div className="graph-filter">
<button
className={
graphType==="daily"
? "active"
: ""
}
onClick={()=>
setGraphType("daily")
}
>
Day
</button>

<button
className={
graphType==="weekly"
? "active"
: ""
}
onClick={()=>
setGraphType("weekly")
}
>
weekly
</button>

  <button
className={
graphType==="monthly"
? "active"
: ""
}
onClick={()=>
setGraphType("monthly")
}
>
Month
</button>

  <button
className={
graphType==="yearly"
? "active"
: ""
}
onClick={()=>
setGraphType("yearly")
}
>
year
</button>

</div>

        <h1>
          👨‍⚕️ {doctor.doctorName}
        </h1>

        <div className="doctor-rating">
          ⭐ {doctor.averageRating}
        </div>

        <div className="total-feedback">
          Total Feedback: {doctor.totalFeedback}
        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card excellent">
          <h3>Excellent</h3>
          <p>{doctor.excellent}</p>
        </div>

        <div className="stat-card good">
          <h3>Good</h3>
          <p>{doctor.good}</p>
        </div>

      </div>

     {graphData.length > 0 ? (

<div className="graph-section">

  <h2>
    {graphType.toUpperCase()} Feedback Trend
  </h2>

  <ResponsiveContainer
  width="100%"
  height={450}
>
  <LineChart
    data={graphData}
    margin={{
      top: 30,
      right: 30,
      left: 20,
      bottom: 20
    }}
  >

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey={
        graphType === "daily"
          ? "day"
          : graphType === "weekly"
          ? "week"
          : graphType === "yearly"
          ? "year"
          : "month"
      }
    />

    <YAxis />

    <Tooltip />

    <Line
      type="monotone"
      dataKey="feedback"
      stroke="#000"
      strokeWidth={2}
      dot={{
        r: 6,
        fill: "#000"
      }}
    >
      <LabelList
        dataKey="feedback"
        position="top"
      />
    </Line>

  </LineChart>
</ResponsiveContainer>

</div>

) : (

<h3>No Graph Data Available</h3>

)}


    </div>

  </div>

);

};

export default DoctorDetails;