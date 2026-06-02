import { useEffect, useState } from "react";
import API from "../service/api";
import "../styles/GeneralFeedback.css";
import * as XLSX from "xlsx";

const GeneralFeedback = () => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
    const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getData = async () => {

    try {

    const res =
await API.get("/feedback/general");

setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

    const convertDate = (dateString) => {

    if (!dateString) return null;

    const [day, month, year] =
      dateString.split("/");

    return new Date(
      year,
      month - 1,
      day
    );

  };

   const htmlDateToDate = (dateString) => {

  if (!dateString) return null;

  const [year, month, day] =
    dateString.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

};

const filteredData = data.filter((item) => {

  if (!fromDate && !toDate)
    return true;

  const itemDate =
    convertDate(item.date);

  const from =
    fromDate
      ? htmlDateToDate(fromDate)
      : null;

  const to =
    toDate
      ? htmlDateToDate(toDate)
      : null;

  if (to) {

    to.setHours(
      23,
      59,
      59,
      999
    );

  }

  if (from && itemDate < from)
    return false;

  if (to && itemDate > to)
    return false;

  return true;

});

  const exportToExcel = () => {

  const exportData = filteredData.map((item) => ({
    Date: item.date,

    Gender: item.gender,

    Mobile: item.mobile,

    Cleanliness:
      item.ratings?.cleanliness,

    StaffBehaviour:
      item.ratings?.staffBehaviour,

    Environment:
      item.ratings?.environment,

    OverallExperience:
      item.ratings?.overallExperience,

    Feedback:
      item.feedback

  }));

  const ws =
    XLSX.utils.json_to_sheet(exportData);

  const wb =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    ws,
    "GENERAL"
  );

  XLSX.writeFile(
    wb,
    "General_Feedback.xlsx"
  );

};

  useEffect(() => {
    getData();
  }, []);

  return (

    <div className="feedback-container">

      <h1>General Feedback Management</h1>
      <div className="filter-box">
        <p>From Date</p>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <p>To Date</p>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button
          className="export-btn"
          onClick={exportToExcel}
        >
          Export Excel
        </button>
      </div>

      <table className="feedback-table">

        <thead>
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>Mobile</th>
            <th>Feedback</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredData.map((item,index)=>(

            <tr key={item._id}>

              <td>{index+1}</td>
              <td>{item.date}</td>

              <td>{item.mobile}</td>

              <td>
                {item.feedback?.slice(0,30)}
              </td>

              <td>

                <button
                  className="view-btn"
                  onClick={() =>
                    setSelected(item)
                  }
                >
                  View Details
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selected && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              General Feedback Details
            </h2>

            <p>
              <b>Date:</b>
              {selected.date}
            </p>

            <p>
              <b>Gender:</b>
              {selected.gender}
            </p>

            <p>
              <b>Mobile:</b>
              {selected.mobile}
            </p>

            <p>
              <b>Feedback:</b>
              {selected.feedback}
            </p>

            <hr />

            <h3>Ratings</h3>

            <p>
              Cleanliness :
              {selected.ratings?.cleanliness}
            </p>

            <p>
              Staff Behaviour :
              {selected.ratings?.staffBehaviour}
            </p>

            <p>
              Environment :
              {selected.ratings?.environment}
            </p>

            <p>
              Overall Experience :
              {selected.ratings?.overallExperience}
            </p>

            <button
              className="close-btn"
              onClick={() =>
                setSelected(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default GeneralFeedback;