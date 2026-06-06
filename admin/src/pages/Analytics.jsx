import { useEffect, useState } from "react";
import API from "../service/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import "../styles/Analytics.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28"
];

const Analytics = () => {

  const [allData, setAllData] = useState([]);
const [sentiment,setSentiment] =
useState({
  positiveCount:0,
  negativeCount:0,
  positive:[],
  negative:[]
});

const [showList,setShowList] =
useState([]);

const getSentiment = async()=>{

 const res =
 await API.get("/sentiment/sentiment");

 setSentiment(res.data);

};

  useEffect(() => {
    getAnalytics();
    getSentiment();
  }, []);

  const getAnalytics = async () => {

    try {

      const res =
        await API.get("/feedback");

      setAllData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const opd =
    allData.filter(
      item => item.type === "OPD"
    ).length;

  const ipd =
    allData.filter(
      item => item.type === "IPD"
    ).length;

  const general =
    allData.filter(
      item => item.type === "GENERAL"
    ).length;

  const total =
    allData.length;

  const male =
    allData.filter(
      item => item.gender === "Male"
    ).length;

  const female =
    allData.filter(
      item => item.gender === "Female"
    ).length;

  const feedbackTypeData = [
    {
      name: "OPD",
      value: opd
    },
    {
      name: "IPD",
      value: ipd
    },
    {
      name: "GENERAL",
      value: general
    }
  ];

  const genderData = [
    {
      name: "Male",
      value: male
    },
    {
      name: "Female",
      value: female
    }
  ];

  

  return (

    <div className="analytics-container">

      <h1 className="page-title">
        Analytics Dashboard
      </h1>

      {/* Cards */}

      <div className="analytics-cards">

        <div className="card">
          <h2>{total}</h2>
          <p>Total Feedback</p>
        </div>

        <div className="card">
          <h2>{opd}</h2>
          <p>OPD Feedback</p>
        </div>

        <div className="card">
          <h2>{ipd}</h2>
          <p>IPD Feedback</p>
        </div>

        <div className="card">
          <h2>{general}</h2>
          <p>General Feedback</p>
        </div>

      </div>

    <div className="sentiment-wrapper">
      <div
 className="sentiment-card positive"
 onClick={()=>
 setShowList(
 sentiment.positive
 )
 }
>
 <h2>
   😊 Positive
 </h2>

 <p>
   {sentiment.positiveCount}
 </p>
</div>

<div
 className="sentiment-card negative"
 onClick={()=>
 setShowList(
 sentiment.negative
 )
 }
>
 <h2>
   😡 Negative
 </h2>

 <p>
   {sentiment.negativeCount}
 </p>
</div>
</div>

{
showList.length > 0 && (

<div className="modal-overlay">

 <div className="modal">

   <h2>
     Feedback List
   </h2>

   {
   showList.map(item=>(
    <div
      className="feedback-card"
      key={item._id}
    >
      {item.text}
    </div>
   ))
   }

   <button
   onClick={()=>
   setShowList([])
   }
   >
    Close
   </button>

 </div>

</div>

)
}

      <div className="chart-grid">

        {/* Feedback Type */}

        <div className="chart-box">

          <h3>
            Feedback Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={feedbackTypeData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {feedbackTypeData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Gender */}

        <div className="chart-box">

          <h3>
            Gender Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={genderData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {genderData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bar Chart */}

      <div className="chart-box">

        <h3>
          Feedback Overview
        </h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={feedbackTypeData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#0088FE"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default Analytics;