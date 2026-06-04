import { useEffect, useState } from "react";
import API from "../service/api";
import "../styles/OPDFeedback.css";
import * as XLSX from "xlsx";

const OPDFeedback = () => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getData = async () => {

    try {

      const res =
        await API.get("/feedback/opd");

      setData(res.data);

    } catch (err) {

      console.log(err);

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
      UHID: item.uhid,
      Name: item.name,
      Age: item.age,
      Gender: item.gender,
      Mobile: item.contact,
      Doctor: item.doctorName,
      Email: item.email,

      AppointmentExperience: item.ratings?.appointment,
      RegistrationExperience: item.ratings?.registration,
      DoctorExperience: item.ratings?.doctor,
      LaboratoryExperience: item.ratings?.laboratory,
      RadiologyExperience: item.ratings?.radiology,
      PharmacyExperience: item.ratings?.pharmacy,
      HousekeepingExperience: item.ratings?.housekeeping,
      ParkingAndSecurityExperience: item.ratings?.parking,
      HowLikelyAreYouToRecommendUsToAFriendOrFamilyMember: item.ratings?.recommend,
      DidYouReceiveOverallValueForMoney: item.ratings?.valueMoney,

      Comment: item.comment,

    }));

    const ws =
      XLSX.utils.json_to_sheet(exportData);

    const wb =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      wb,
      ws,
      "OPD"
    );

    XLSX.writeFile(
      wb,
      "OPD_Feedback.xlsx"
    );

  };

  useEffect(() => {

    getData();

  }, []);

  return (

    <div className="opd-container">

      <h1 className="page-title">
        OPD Feedback Management
      </h1>


      <div className="filter-box">
        <p className="datecolor">From Date</p>
        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
        />
        <p className="datecolor">To Date</p>
        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
        />

        <button
          className="export-btn"
          onClick={exportToExcel}
        >
          Export Excel
        </button>

      </div>

      <div className="table-wrapper">

        <table className="feedback-table">

          <thead>

            <tr>

              <th>SL</th>
              <th>Date</th>
              <th>Name</th>
              <th>Doctor</th>
              <th>Mobile</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredData.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.date}</td>

                <td>
                  {item.name || item.patientName}
                </td>

                <td>
                  {item.doctorName ||
                    item.consultantName}
                </td>

                <td>
                  {item.contact ||
                    item.contactNo}
                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelected(item)
                    }
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selected && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Complete OPD Feedback
            </h2>

            <div className="details-grid">

              <p>
                <b>Date :</b>
                {selected.date}
              </p>

              <p>
                <b>UHID :</b>
                {selected.uhid}
              </p>

              <p>
                <b>Name :</b>
                {selected.name ||
                  selected.patientName}
              </p>

              <p>
                <b>Age :</b>
                {selected.age}
              </p>

              <p>
                <b>Gender :</b>
                {selected.gender}
              </p>

              <p>
                <b>Contact :</b>
                {selected.contact ||
                  selected.contactNo}
              </p>

              <p>
                <b>Doctor :</b>
                {selected.doctorName ||
                  selected.consultantName}
              </p>

              <p>
                <b>Email :</b>
                {selected.email}
              </p>

              <p>
                <b>Feedback/Suggestion :</b>
                {selected.comment}
              </p>

              {/* <p>
                <b>Feedback :</b>
                {selected.feedback}
              </p>

              <p>
                <b>Suggestion :</b>
                {selected.suggestion}
              </p> */}

            </div>

            <h3>Ratings</h3>

            <div className="rating-box">

              <p>
                Appointment Experience :
                {"  "+selected.ratings?.appointment}
              </p>

              <p>
                Registration Experience :
                {"  "+selected.ratings?.registration}
              </p>

              <p>
                Doctor Experience :
                {"  "+selected.ratings?.doctor}
              </p>

              <p>
                Laboratory Experience :
                {"  "+selected.ratings?.laboratory}
              </p>

              <p>
                Radiology Experience :
                {"  "+selected.ratings?.radiology}
              </p>

              <p>
                Pharmacy Experience :
                {"  "+selected.ratings?.pharmacy}
              </p>

              <p>
                Housekeeping Experience :
                {"  "+selected.ratings?.housekeeping}
              </p>

              <p>
                Parking & Security Experience :
                {"  "+selected.ratings?.parking}
              </p>

              <p>
                How likely are you to recommend us to a friend or family member? :
                {"  "+selected.ratings?.recommend}
              </p>

              <p>
                Did you receive overall value for money :
                {"  "+selected.ratings?.valueMoney}
              </p>

            </div>

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

export default OPDFeedback;
