const Feedback = require("../models/Feedback");

const sendEmail = require("../services/emailservice");


// ============================================================
// DEPARTMENT EMAIL MAPPING
// ============================================================

const departmentEmails = {
  OPD: process.env.OPD_EMAIL,
  // IPD: process.env.IPD_EMAIL,
  // GENERAL: process.env.GENERAL_EMAIL,
};


// ============================================================
// CREATE FEEDBACK
// ============================================================

const createFeedback = async (req, res) => {

  try {

    console.log("Incoming Feedback Data:", req.body);


    // ========================================================
    // SAVE FEEDBACK TO MONGODB
    // ========================================================

    const feedback = await Feedback.create(req.body);


    // ========================================================
    // GET FEEDBACK TYPE
    // ========================================================

    const feedbackType = req.body.type;

    const departmentEmail =
      departmentEmails[feedbackType];


    // ========================================================
    // CHECK DEPARTMENT EMAIL
    // ========================================================

    if (!departmentEmail) {

      console.error(
        `❌ No department email configured for type: ${feedbackType}`
      );

    } else {

      // ======================================================
      // CREATE EMAIL SUBJECT
      // ======================================================

      const subject =
        `${feedbackType} Patient Feedback - Utkal Hospital`;


      // ======================================================
      // CREATE EMAIL BODY
      // ======================================================

      const html = createFeedbackEmail(
        feedbackType,
        req.body
      );


      // ======================================================
      // SEND EMAIL TO DEPARTMENT
      // ======================================================

      try {

        await sendEmail({
          to: departmentEmail,
          subject: subject,
          html: html,
        });

        console.log(
          `✅ ${feedbackType} feedback sent to ${departmentEmail}`
        );

      } catch (emailError) {

        console.error(
          "❌ Department Email Error:",
          emailError.message
        );

        // Feedback is already saved in MongoDB.
        // Email failure should NOT fail the feedback submission.
      }

    }


    // ========================================================
    // OPTIONAL: SEND THANK-YOU EMAIL TO PATIENT
    // ========================================================

    if (
      req.body.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
    ) {

      try {

        await sendEmail({

          to: req.body.email,

          subject: "Thank You for Your Feedback - Utkal Hospital",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            ">

              <h2 style="color:#1d4ed8;">
                Thank You for Your Feedback
              </h2>

              <p>
                Dear ${req.body.name || req.body.patientName || "Patient"},
              </p>

              <p>
                Thank you for taking the time to share
                your valuable feedback with Utkal Hospital.
              </p>

              <p>
                Your feedback helps us improve our
                healthcare services and patient experience.
              </p>

              <p>
                Regards,<br>
                <strong>Utkal Hospital</strong>
              </p>

            </div>
          `,

        });

        console.log(
          `✅ Thank-you email sent to ${req.body.email}`
        );

      } catch (patientEmailError) {

        console.error(
          "❌ Patient Email Error:",
          patientEmailError.message
        );

      }

    }


    // ========================================================
    // RESPONSE
    // ========================================================

    res.status(201).json({

      success: true,

      message: "Feedback submitted successfully",

      data: feedback,

    });


  } catch (error) {

    console.error(
      "❌ Feedback Save Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ============================================================
// CREATE FEEDBACK EMAIL
// ============================================================

const createFeedbackEmail = (
  feedbackType,
  data
) => {

  let content = "";


  // ==========================================================
  // OPD EMAIL
  // ==========================================================

  if (feedbackType === "OPD") {

    content = `

      <h3>OPD Patient Feedback</h3>

      <table
        border="1"
        cellpadding="8"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;"
      >

        <tr>
          <td><strong>Date</strong></td>
          <td>${data.date || "-"}</td>
        </tr>

        <tr>
          <td><strong>UHID</strong></td>
          <td>${data.uhid || "-"}</td>
        </tr>

        <tr>
          <td><strong>Patient Name</strong></td>
          <td>${data.name || "-"}</td>
        </tr>

        <tr>
          <td><strong>Age</strong></td>
          <td>${data.age || "-"}</td>
        </tr>

        <tr>
          <td><strong>Gender</strong></td>
          <td>${data.gender || "-"}</td>
        </tr>

        <tr>
          <td><strong>Mobile</strong></td>
          <td>${data.contact || "-"}</td>
        </tr>

        <tr>
          <td><strong>Doctor</strong></td>
          <td>${data.doctorName || "-"}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${data.email || "-"}</td>
        </tr>

      </table>


      <h3>OPD Ratings</h3>

      ${createRatingsTable(data.ratings)}


      <h3>Comments / Suggestions</h3>

      <div style="
        padding:15px;
        background:#f5f5f5;
        border-radius:6px;
      ">
        ${data.comment || "No comments provided"}
      </div>

    `;

  }


  // ==========================================================
  // IPD EMAIL
  // ==========================================================

  else if (feedbackType === "IPD") {

    content = `

      <h3>IPD Patient Feedback</h3>

      <table
        border="1"
        cellpadding="8"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;"
      >

        <tr>
          <td><strong>Patient Name</strong></td>
          <td>${data.patientName || "-"}</td>
        </tr>

        <tr>
          <td><strong>Gender</strong></td>
          <td>${data.gender || "-"}</td>
        </tr>

        <tr>
          <td><strong>IP No</strong></td>
          <td>${data.ipNo || "-"}</td>
        </tr>

        <tr>
          <td><strong>Consultant</strong></td>
          <td>${data.consultantName || "-"}</td>
        </tr>

        <tr>
          <td><strong>Bed Category</strong></td>
          <td>${data.bedCategory || "-"}</td>
        </tr>

        <tr>
          <td><strong>Bed No</strong></td>
          <td>${data.bedNo || "-"}</td>
        </tr>

        <tr>
          <td><strong>Admission Date</strong></td>
          <td>${data.admissionDate || "-"}</td>
        </tr>

        <tr>
          <td><strong>Discharge Date</strong></td>
          <td>${data.dischargeDate || "-"}</td>
        </tr>

        <tr>
          <td><strong>Contact No</strong></td>
          <td>${data.contactNo || "-"}</td>
        </tr>

      </table>


      <h3>Recommendation Score</h3>

      <p>
        <strong>
          ${data.recommendStar || 0} / 10
        </strong>
      </p>


      <h3>Reasons for Score</h3>

      <p>
        ${
          data.reasonScore?.length
            ? data.reasonScore.join(", ")
            : "Not provided"
        }
      </p>


      <h3>Hospital Choice</h3>

      <p>
        ${
          data.hospitalChoice?.length
            ? data.hospitalChoice.join(", ")
            : "Not provided"
        }
      </p>


      <h3>IPD Service Ratings</h3>

      ${createRatingsTable({

        "Admission Experience":
          data.admissionExperience,

        "Doctor Experience":
          data.doctorExperience,

        "Nursing Care":
          data.nursingCare,

        "Physiotherapy":
          data.physiotherapy,

        "Housekeeping Service":
          data.housekeepingService,

        "Food & Beverages":
          data.foodBeverages,

        "Discharge & Billing":
          data.billingProcess,

        "Attendant Experience":
          data.attendantExperience,

        "Emergency":
          data.emergency,

        "ICU":
          data.icu,

        "OT":
          data.ot,

        "Ambulance":
          data.ambulance,

        "Security":
          data.security,

      })}


      <h3>Staff Mention</h3>

      <p>
        ${data.staffMention || "No response"}
      </p>


      <h3>Inconvenience</h3>

      <p>
        ${data.inconvenience || "No response"}
      </p>


      <h3>Suggestion</h3>

      <p>
        ${data.suggestion || "No response"}
      </p>

    `;

  }


  // ==========================================================
  // GENERAL EMAIL
  // ==========================================================

  else if (feedbackType === "GENERAL") {

    content = `

      <h3>General Patient Feedback</h3>

      <table
        border="1"
        cellpadding="8"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;"
      >

        <tr>
          <td><strong>Date</strong></td>
          <td>${data.date || "-"}</td>
        </tr>

        <tr>
          <td><strong>Name</strong></td>
          <td>${data.name || "-"}</td>
        </tr>

        <tr>
          <td><strong>Gender</strong></td>
          <td>${data.gender || "-"}</td>
        </tr>

        <tr>
          <td><strong>Mobile</strong></td>
          <td>${data.mobile || "-"}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${data.email || "-"}</td>
        </tr>

      </table>


      <h3>Ratings</h3>

      ${createRatingsTable(data.ratings)}


      <h3>Feedback / Suggestions</h3>

      <div style="
        padding:15px;
        background:#f5f5f5;
        border-radius:6px;
      ">
        ${data.feedback || "No feedback provided"}
      </div>

    `;

  }


  // ==========================================================
  // FINAL EMAIL HTML
  // ==========================================================

  return `

    <div style="
      font-family:Arial,sans-serif;
      max-width:900px;
      margin:auto;
      color:#333;
    ">

      <div style="
        background:#1d4ed8;
        color:white;
        padding:18px;
        text-align:center;
      ">

        <h2>
          Utkal Hospital
        </h2>

        <p>
          ${feedbackType} Feedback Notification
        </p>

      </div>


      <div style="padding:20px;">

        ${content}

      </div>


      <hr>

      <p style="
        font-size:12px;
        color:#777;
        text-align:center;
      ">

        This is an automated email generated
        by the Utkal Hospital Patient Feedback System.

      </p>

    </div>

  `;
};


// ============================================================
// CREATE RATINGS TABLE
// ============================================================

const createRatingsTable = (ratings = {}) => {

  let rows = "";

  Object.entries(ratings).forEach(
    ([key, value]) => {

      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());


      rows += `

        <tr>

          <td>
            <strong>${label}</strong>
          </td>

          <td>
            ${value || "-"}
          </td>

        </tr>

      `;

    }
  );


  return `

    <table
      border="1"
      cellpadding="8"
      cellspacing="0"
      style="
        border-collapse:collapse;
        width:100%;
      "
    >

      <tr style="background:#f1f5f9;">

        <th>
          Service
        </th>

        <th>
          Rating
        </th>

      </tr>

      ${rows}

    </table>

  `;
};


// ============================================================
// ALL FEEDBACK
// ============================================================

const getAllFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find()
        .sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ============================================================
// OPD FEEDBACK
// ============================================================

const getOPDFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "OPD",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ============================================================
// IPD FEEDBACK
// ============================================================

const getIPDFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "IPD",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ============================================================
// GENERAL FEEDBACK
// ============================================================

const getGeneralFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.find({
        type: "GENERAL",
      }).sort({ createdAt: -1 });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

  createFeedback,

  getAllFeedback,

  getOPDFeedback,

  getIPDFeedback,

  getGeneralFeedback,

};