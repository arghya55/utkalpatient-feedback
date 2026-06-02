import { useState } from "react";
import "./IpdFeedbackForm.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const IpdFeedbackForm = () => {

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    ipNo: "",
    consultantName: "",
    bedCategory: "",
    bedNo: "",
    admissionDate: "",
    dischargeDate: "",
    contactNo: "",

    recommendStar: 0,

    reasonScore: [],
    hospitalChoice: [],

    admissionExperience: 0,
    doctorExperience: 0,
    nursingCare: 0,
    physiotherapy: 0,
    housekeepingService: 0,
    foodBeverages: 0,
    billingProcess: 0,
    attendantExperience: 0,
    emergency: 0,
    icu: 0,
    ot: 0,
    ambulance: 0,
    security: 0,

    staffMention: "",
    inconvenience: "",
    suggestion: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {

    const { name, value } = e.target;

    if (name === "patientName") {

      if (/[^a-zA-Z\s]/.test(value)) return;

    }

    if (name === "consultantName") {

      if (/[^a-zA-Z\s]/.test(value)) return;

    }

    if (name === "contactNo") {

      if (!/^\d{0,10}$/.test(value)) return;

    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleCheckbox = (field, value) => {

    if (formData[field].includes(value)) {

      setFormData({
        ...formData,
        [field]: formData[field].filter(
          (item) => item !== value
        ),
      });

    } else {

      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });

    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.gender ||
      !formData.ipNo ||
      !formData.consultantName ||
      !formData.bedCategory ||
      !formData.bedNo ||
      !formData.admissionDate ||
      !formData.dischargeDate ||
      !formData.contactNo
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.contactNo.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    try {
      await API.post("/feedback", {
        ...formData,
        type: "IPD",
      });

      navigate("/thank-you");

    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  const starQuestions = [
    {
      title: "13. Admission Experience",
      desc: "Overall, how would you rate your experience with the Admissions Process?",
      field: "admissionExperience",
    },

    {
      title: "14. Doctor Experience",
      desc: "Overall, how would you rate your experience with our Doctors?",
      field: "doctorExperience",
    },

    {
      title: "15. Nursing Care",
      desc: "Overall, how would you rate your experience with our Nurses?",
      field: "nursingCare",
    },

    {
      title: "16. Physiotherapy",
      desc: "Overall, how would you rate your experience with Physiotherapy? (if availed)",
      field: "physiotherapy",
    },

    {
      title: "17. Housekeeping Service",
      desc: "Overall, how would you rate your in room House-keeping experience?",
      field: "housekeepingService",
    },

    {
      title: "18. Food and beverages",
      desc: "Overall, how would you rate your experience with the Patient Food Services?",
      field: "foodBeverages",
    },

    {
      title: "19. Discharge & Billing Process",
      desc: "Overall, how would you rate your experience with the Discharge Process?",
      field: "billingProcess",
    },

    {
      title: "20. Attendants Experience",
      desc: "Overall, how would you rate your experience with the services provided to your attendant/ family/ visiting relative(s)?",
      field: "attendantExperience",
    },

    {
      title: "21. Emergency",
      desc: "Overall, how would you rate your experience of Hospital Emergency? (if availed)",
      field: "emergency",
    },

    {
      title: "22. ICU",
      desc: "Overall, how would you rate your experience in ICU? (if availed)",
      field: "icu",
    },

    {
      title: "23. OT",
      desc: "Overall, how would you rate your experience in OT? (if availed)",
      field: "ot",
    },

    {
      title: "24. Ambulance Services",
      desc: "Overall, how would you rate your experience with Ambulance Services? (if availed)",
      field: "ambulance",
    },
    {
      title: "25. Security Services",
      desc: "Overall, how would you rate your experience with Security Services? (if availed)",
      field: "security",
    },
  ];

  return (

    <div className="ipd-page">

      <form
        className="ipd-form"
        onSubmit={handleSubmit}
      >

        <div className="ipd-header">
          <Link to="/">
            <button className="back-btn">
              Back To Home
            </button>
          </Link>

          <div className="ipd-header-bar">
            IPD FEEDBACK FORM
          </div>
        </div>

        <p className="ipd-subtitle">
          Please give us your feedback on the services availed at our hospital
        </p>

        <div className="ipd-input-group">

          <label>
            1. PATIENTS NAME *
          </label>

          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            2. GENDER *
          </label>

          <div className="ipd-radio-group">

            <label>

              <input
                type="radio"
                name="gender"
                value="Female"
                checked={
                  formData.gender === "Female"
                }
                onChange={handleInput}
                required
              />

              Female

            </label>

            <label>

              <input
                type="radio"
                name="gender"
                value="Male"
                checked={
                  formData.gender === "Male"
                }
                onChange={handleInput}
                required
              />

              Male

            </label>

          </div>

        </div>

        <div className="ipd-input-group">

          <label>
            3. IP NO *
          </label>

          <input
            type="text"
            name="ipNo"
            value={formData.ipNo}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            4. CONSULTANT NAME *
          </label>

          <input
            type="text"
            name="consultantName"
            value={formData.consultantName}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            5. BED CATEGORY *
          </label>

          <input
            type="text"
            name="bedCategory"
            value={formData.bedCategory}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            6. BED NO *
          </label>

          <input
            type="text"
            name="bedNo"
            value={formData.bedNo}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            7. DATE OF ADMISSION *
          </label>

          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            8. DATE OF DISCHARGE *
          </label>

          <input
            type="date"
            name="dischargeDate"
            value={formData.dischargeDate}
            onChange={handleInput}
            required
          />

        </div>

        <div className="ipd-input-group">

          <label>
            9. CONTACT NO *
          </label>

          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInput}
            maxLength="10"
            required
          />

        </div>

        {/* QUESTION 10 */}

        <div className="ipd-question-block">

          <h3>
            10. How likely are you to recommend
            Utkal Hospitals to your Friends &
            family for its Medical Treatment and
            overall Patient Experience?
          </h3>

          <div className="ipd-star-row">

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                type="button"
                className={
                  formData.recommendStar >= star
                    ? "star-active"
                    : "star-btn"
                }
                onClick={() =>
                  setFormData({
                    ...formData,
                    recommendStar: star,
                  })
                }
              >
                ★
              </button>
            ))}

          </div>

        </div>

        {/* QUESTION 11 */}

        <div className="ipd-question-block">

          <h3>
            11. Please mention the reason from the following for your score *
          </h3>

          {[
            "Doctor Visits",
            "ICU Services",
            "Discharge process",
            "Food Quality",
            "Nursing Care",
            "Billing and cost",
            "Medical procedures / OT",
            "House Keeping Services",
            "Caring & Kind Staff Behavior",
          ].map((item) => (
            <label
              key={item}
              className="checkbox-label"
            >

              <input
                type="checkbox"
                onChange={() =>
                  handleCheckbox(
                    "reasonScore",
                    item
                  )
                }
              />

              {item}

            </label>
          ))}

        </div>

        {/* QUESTION 12 */}

        <div className="ipd-question-block">

          <h3>
            12. Which of the below influenced your decision to choose our hospital?
          </h3>

          {[
            "Location",
            "Doctor preference",
            "Corporate tie-up / Doctor referral",
            "Reputation",
            "Web-site/Advertising",
            "Family Doctor referred",
            "Friend/ Family recommendation",
            "Service Experience",
          ].map((item) => (
            <label
              key={item}
              className="checkbox-label"
            >

              <input
                type="checkbox"
                onChange={() =>
                  handleCheckbox(
                    "hospitalChoice",
                    item
                  )
                }
              />

              {item}

            </label>
          ))}

        </div>

        {/* STAR QUESTIONS */}

        {starQuestions.map((item) => (

          <div
            key={item.field}
            className="ipd-question-block"
          >

            <div className="question-header">

              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="ipd-star-row">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      formData[item.field] >= star
                        ? "star-active"
                        : "star-btn"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        [item.field]: star,
                      })
                    }
                  >
                    ★
                  </button>
                ))}

              </div>

            </div>

          </div>

        ))}

        {/* QUESTION 28 */}

        <div className="ipd-input-group">

          <label>
            26. Did any of our staff who provided an exceptional service that you feel worth a mention?
          </label>

          <textarea
            name="staffMention"
            value={formData.staffMention}
            onChange={handleInput}
          ></textarea>

        </div>

        {/* QUESTION 27 */}

        <div className="ipd-input-group">

          <label>
            27. Any Inconvenience faced?
          </label>

          <textarea
            name="inconvenience"
            value={formData.inconvenience}
            onChange={handleInput}
          ></textarea>

        </div>

        {/* QUESTION 28 */}

        <div className="ipd-input-group">

          <label>
            28. Any suggestion to improve our hospital?
          </label>

          <textarea
            name="suggestion"
            value={formData.suggestion}
            onChange={handleInput}
          ></textarea>

        </div>

        <button
          type="submit"
          className="ipd-submit-btn"
        >
          Submit
        </button>

      </form>

    </div>
  );
};

export default IpdFeedbackForm;