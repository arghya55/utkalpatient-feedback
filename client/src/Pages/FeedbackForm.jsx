import { useState, useEffect } from "react";
import "./FeedbackForm.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const FeedbackForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    uhid: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    doctorName: "",
    email: "",
    comment: "",
  });

  const [ratings, setRatings] = useState({
    appointment: "",
    registration: "",
    doctor: "",
    laboratory: "",
    radiology: "",
    pharmacy: "",
    housekeeping: "",
    parking: "",
    recommend: "",
    valueMoney: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // SET TODAY'S DATE
  // =========================================================

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");

    setFormData((prev) => ({
      ...prev,
      date: today,
    }));
  }, []);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleInput = (e) => {
    const { name, value } = e.target;

    // MOBILE NUMBER
    if (name === "contact") {
      const onlyNumber = value.replace(/\D/g, "");

      if (onlyNumber.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          contact: onlyNumber,
        }));
      }

      return;
    }

    // AGE
    if (name === "age") {
      const onlyNumber = value.replace(/\D/g, "");

      if (
        onlyNumber === "" ||
        parseInt(onlyNumber, 10) <= 120
      ) {
        setFormData((prev) => ({
          ...prev,
          age: onlyNumber,
        }));
      }

      return;
    }

    // PATIENT NAME
    if (name === "name") {
      const onlyText = value.replace(
        /[^A-Za-z\s]/g,
        ""
      );

      setFormData((prev) => ({
        ...prev,
        name: onlyText,
      }));

      return;
    }

    // DOCTOR NAME
    if (name === "doctorName") {
      const onlyDoctorText = value.replace(
        /[^A-Za-z\s.]/g,
        ""
      );

      setFormData((prev) => ({
        ...prev,
        doctorName: onlyDoctorText,
      }));

      return;
    }

    // OTHER FIELDS
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE RATING
  // =========================================================

  const handleRating = (field, value) => {
    setRatings((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error after selecting rating
    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // =========================================================
  // RATING OPTIONS
  // =========================================================

  const ratingOptions = [
    "Excellent",
    "Good",
    "Fair",
    "Needs Improvement",
    "Poor",
  ];

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    // DATE
    if (!formData.date) {
      newErrors.date = true;
    }

    // UHID
    if (!formData.uhid.trim()) {
      newErrors.uhid = true;
    }

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = true;
    }

    // MOBILE
    if (!formData.contact.trim()) {
      newErrors.contact = true;
    } else if (formData.contact.length !== 10) {
      newErrors.contact = true;
    }

    // AGE
    if (!formData.age.trim()) {
      newErrors.age = true;
    } else if (
      parseInt(formData.age, 10) < 1 ||
      parseInt(formData.age, 10) > 120
    ) {
      newErrors.age = true;
    }

    // GENDER
    if (!formData.gender.trim()) {
      newErrors.gender = true;
    }

    // DOCTOR NAME
    if (!formData.doctorName.trim()) {
      newErrors.doctorName = true;
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = true;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = true;
    }

    // COMMENT
    if (!formData.comment.trim()) {
      newErrors.comment = true;
    }

    // RATINGS
    Object.keys(ratings).forEach((key) => {
      if (!ratings[key]) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks
    if (isSubmitting) {
      return;
    }

    // VALIDATE
    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    // Create payload
    const payload = {
      ...formData,
      ratings,
      type: "OPD",
    };

    console.log("Submitting OPD Feedback:", payload);

    // =======================================================
    // NAVIGATE IMMEDIATELY
    // =======================================================

    navigate("/thank-you", {
      replace: true,
    });

    // =======================================================
    // SAVE DATA IN BACKGROUND
    // =======================================================

    try {
      const response = await API.post(
        "/feedback",
        payload
      );

      console.log(
        "OPD feedback saved successfully:",
        response.data
      );
    } catch (error) {
      console.error(
        "Background feedback submission failed:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // SERVICES
  // =========================================================

  const services = [
    {
      label: "Appointment Experience",
      field: "appointment",
    },
    {
      label: "Registration Experience",
      field: "registration",
    },
    {
      label: "Doctor Experience",
      field: "doctor",
    },
    {
      label: "Laboratory Experience",
      field: "laboratory",
    },
    {
      label: "Radiology Experience",
      field: "radiology",
    },
    {
      label: "Pharmacy Experience",
      field: "pharmacy",
    },
    {
      label: "Housekeeping Experience",
      field: "housekeeping",
    },
    {
      label: "Parking & Security Experience",
      field: "parking",
    },
    {
      label:
        "How likely are you to recommend us to family/friends?",
      field: "recommend",
    },
    {
      label:
        "Did you receive overall value for money?",
      field: "valueMoney",
    },
  ];

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="premium-feedback-page">
      <div className="premium-feedback-card">

        {/* BACK BUTTON */}

        <Link to="/">
          <button
            type="button"
            className="back-btn"
          >
            Back To Home
          </button>
        </Link>

        {/* HEADER */}

        <div className="premium-header">
          OPD FEEDBACK FORM
        </div>

        {/* FORM */}

        <form
          onSubmit={submitHandler}
          className="premium-form-body"
        >

          {/* INPUT GRID */}

          <div className="premium-input-grid">

            {/* DATE */}

            <div className="premium-input-group">
              <label>Date *</label>

              <input
                type="text"
                name="date"
                value={formData.date}
                readOnly
                className={
                  errors.date
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* UHID */}

            <div className="premium-input-group">
              <label>UHID *</label>

              <input
                type="text"
                name="uhid"
                placeholder="Enter UHID"
                value={formData.uhid}
                onChange={handleInput}
                className={
                  errors.uhid
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* NAME */}

            <div className="premium-input-group">
              <label>Patient Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter patient name"
                value={formData.name}
                onChange={handleInput}
                className={
                  errors.name
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* CONTACT */}

            <div className="premium-input-group">
              <label>Mobile Number *</label>

              <input
                type="text"
                name="contact"
                maxLength="10"
                inputMode="numeric"
                placeholder="Enter mobile number"
                value={formData.contact}
                onChange={handleInput}
                className={
                  errors.contact
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* AGE */}

            <div className="premium-input-group">
              <label>Age *</label>

              <input
                type="text"
                name="age"
                placeholder="Enter Your Age"
                value={formData.age}
                onChange={handleInput}
                className={
                  errors.age
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* GENDER */}

            <div className="premium-input-group">
              <label>Gender *</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleInput}
                className={
                  errors.gender
                    ? "premium-error-input"
                    : ""
                }
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            {/* DOCTOR */}

            <div className="premium-input-group">
              <label>Consulting Doctor *</label>

              <input
                type="text"
                name="doctorName"
                placeholder="Doctor name"
                value={formData.doctorName}
                onChange={handleInput}
                className={
                  errors.doctorName
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

            {/* EMAIL */}

            <div className="premium-input-group">
              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInput}
                className={
                  errors.email
                    ? "premium-error-input"
                    : ""
                }
              />
            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="premium-description">
            At Utkal Hospital, we continuously
            work towards improving healthcare
            quality and patient satisfaction.
            Your valuable feedback and suggestions
            help us serve you better.
          </div>

          {/* RATING TABLE */}

          <div className="premium-table-wrapper">

            <table className="premium-feedback-table">

              <thead>
                <tr>
                  <th>Services</th>
                  <th>Excellent</th>
                  <th>Good</th>
                  <th>Fair</th>
                  <th>Needs Improvement</th>
                  <th>Poor</th>
                </tr>
              </thead>

              <tbody>

                {services.map((service) => (

                  <tr key={service.field}>

                    <td
                      className={
                        errors[service.field]
                          ? "premium-radio-error"
                          : ""
                      }
                    >
                      {service.label}

                      {errors[service.field] && (
                        <div className="radio-error-text">
                          Please Select
                        </div>
                      )}
                    </td>

                    {ratingOptions.map((item) => (

                      <td key={item}>

                        <input
                          type="radio"
                          name={service.field}
                          checked={
                            ratings[service.field] === item
                          }
                          onChange={() =>
                            handleRating(
                              service.field,
                              item
                            )
                          }
                        />

                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* COMMENT */}

          <div className="premium-comment-section">

            <h3 className="premium-comment-title">
              Comments / Suggestions *
            </h3>

            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInput}
              placeholder="Write your valuable comments..."
              className={
                `premium-comment-box ${
                  errors.comment
                    ? "premium-error-input"
                    : ""
                }`
              }
            />

          </div>

          {/* SUBMIT BUTTON */}

          <div className="premium-submit-area">

            <button
              type="submit"
              className="premium-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;