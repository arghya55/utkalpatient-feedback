import { useEffect, useState } from "react";
import API from "../service/api";
import "../styles/IPDFeedback.css";
import * as XLSX from "xlsx";

const IPDFeedback = () => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const parseDate = (dateString) => {
    if (!dateString) return null;

    const [day, month, year] = dateString.split("/");

    return new Date(year, month - 1, day);
  };

    const getData = async () => {
    try {
      const res = await API.get("/feedback/ipd");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = () => {

    const exportData = filteredData.map((item) => ({

      PatientName: item.patientName,
      Gender: item.gender,
      IPNo: item.ipNo,
      Consultant: item.consultantName,

      BedCategory: item.bedCategory,
      BedNo: item.bedNo,

      AdmissionDate: item.admissionDate,
      DischargeDate: item.dischargeDate,

      Contact: item.contactNo,

      RecommendScore:
        item.recommendStar,

      ReasonScore:
        item.reasonScore?.join(", "),

      HospitalChoice:
        item.hospitalChoice?.join(", "),

      AdmissionExperience:
        item.admissionExperience,

      DoctorExperience:
        item.doctorExperience,

      NursingCare:
        item.nursingCare,

      Physiotherapy:
        item.physiotherapy,

      Housekeeping:
        item.housekeepingService,

      Food:
        item.foodBeverages,

      Billing:
        item.billingProcess,

      Attendant:
        item.attendantExperience,

      Emergency:
        item.emergency,

      ICU:
        item.icu,

      OT:
        item.ot,

      Ambulance:
        item.ambulance,

      Security:
        item.security,

      StaffMention:
        item.staffMention,

      Inconvenience:
        item.inconvenience,

      Suggestion:
        item.suggestion

    }));

    const ws =
      XLSX.utils.json_to_sheet(exportData);

    const wb =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      wb,
      ws,
      "IPD"
    );

    const fileName =
      fromDate || toDate
        ? `IPD_${fromDate}_TO_${toDate}.xlsx`
        : "IPD_Feedback.xlsx";

    XLSX.writeFile(
      wb,
      fileName
    );

  };

  const filteredData = data.filter((item) => {

    if (!fromDate && !toDate) return true;

    const admission = parseDate(item.admissionDate);
    const discharge = parseDate(item.dischargeDate);

    if (!admission || !discharge) return false;

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (to) to.setHours(23, 59, 59, 999);

    // overlap logic (IMPORTANT)
    if (from && discharge < from) return false;
    if (to && admission > to) return false;

    return true;
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="feedback-container">

      <h1>IPD Feedback Management</h1>

<div className="filter-box">
        <p className="datecolor"> Admission Date:</p>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
          <p className="datecolor"> Discharge Date:</p>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button className="export-btn" onClick={exportToExcel}>
          Export Excel
        </button>

      </div>
      <table className="feedback-table">

         <thead>
           <tr>
             <th>SL</th>
             <th>Patient</th>
             <th>Doctor</th>
             <th>Mobile</th>
             <th>Action</th>
       </tr>
        </thead>

       <tbody>

         {filteredData.map((item, index) => (

            <tr key={item._id}>

              <td>{index + 1}</td>
              <td>{item.patientName}</td>
              <td>{item.consultantName}</td>
              <td>{item.contactNo}</td>

              <td>
                <button
                  className="view-btn"
                  onClick={() => setSelected(item)}
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

            <h2>IPD Feedback Details</h2>

            <div className="details-grid">

              <p><b>Patient:</b> {selected.patientName}</p>
              <p><b>Gender:</b> {selected.gender}</p>
              <p><b>IP No:</b> {selected.ipNo}</p>
              <p><b>Consultant:</b> {selected.consultantName}</p>
              <p><b>Bed Category:</b> {selected.bedCategory}</p>
              <p><b>Bed No:</b> {selected.bedNo}</p>
              <p><b>Admission:</b> {selected.admissionDate}</p>
              <p><b>Discharge:</b> {selected.dischargeDate}</p>
              <p><b>Contact:</b> {selected.contactNo}</p>

              <p>
                <b>Recommend Score:</b>
                {selected.recommendStar}
              </p>

              <p>
                <b>Reason Score:</b>
                {selected.reasonScore?.join(", ")}
              </p>

              <p>
                <b>Hospital Choice:</b>
                {selected.hospitalChoice?.join(", ")}
              </p>

              <p><b>Admission Experience:</b> {selected.admissionExperience}</p>
              <p><b>Doctor Experience:</b> {selected.doctorExperience}</p>
              <p><b>Nursing Care:</b> {selected.nursingCare}</p>
              <p><b>Physiotherapy:</b> {selected.physiotherapy}</p>
              <p><b>Housekeeping:</b> {selected.housekeepingService}</p>
              <p><b>Food:</b> {selected.foodBeverages}</p>
              <p><b>Billing:</b> {selected.billingProcess}</p>
              <p><b>Attendant:</b> {selected.attendantExperience}</p>
              <p><b>Emergency:</b> {selected.emergency}</p>
              <p><b>ICU:</b> {selected.icu}</p>
              <p><b>OT:</b> {selected.ot}</p>
              <p><b>Ambulance:</b> {selected.ambulance}</p>
              <p><b>Security:</b> {selected.security}</p>

              <p><b>Staff Mention:</b> {selected.staffMention}</p>

              <p>
                <b>Inconvenience:</b>
                {selected.inconvenience}
              </p>

              <p>
                <b>Suggestion:</b>
                {selected.suggestion}
              </p>

            </div>

            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default IPDFeedback;
