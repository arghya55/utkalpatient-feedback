import { useState, useEffect } from "react";
import "./FeedbackForm.css";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


const FeedbackForm = () => {

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

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");

    setFormData((prev) => ({
      ...prev,
      date: today,
    }));
  }, []);

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {

    const { name, value } = e.target;

    // MOBILE NUMBER ONLY DIGIT

    if (name === "contact") {

      const onlyNumber = value.replace(/\D/g, "");

      if (onlyNumber.length <= 10) {

        setFormData({
          ...formData,
          [name]: onlyNumber,
        });

      }

      return;
    }
    //age ONLY DIGIT

    if (name === "age") {

      const onlyNumber = value.replace(/\D/g, "");

      if (parseInt(onlyNumber) <= 120) {

        setFormData({
          ...formData,
          [name]: onlyNumber,
        });

      }

      return;
    }

    // NAME ONLY CHARACTER

    if (name === "name") {

      const onlyText = value.replace(
        /[^A-Za-z\s]/g,
        ""
      );

      setFormData({
        ...formData,
        [name]: onlyText,
      });

      return;
    }

    // DOCTOR NAME ONLY CHARACTER

    if (name === "doctorName") {

      const onlyDoctorText = value.replace(
        /[^A-Za-z\s.]/g,
        ""
      );

      setFormData({
        ...formData,
        [name]: onlyDoctorText,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleRating = (field, value) => {

    setRatings({
      ...ratings,
      [field]: value,
    });

  };

  const ratingOptions = [
    "Excellent",
    "Good",
    "Fair",
    "Needs Improvement",
    "Poor",
  ];

  const validateForm = () => {

    let newErrors = {};

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

    } else if (
      formData.contact.length !== 10
    ) {

      newErrors.contact = true;

    }

    // AGE

    if (!formData.age.trim()) {
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

    // RADIO BUTTON VALIDATION

    Object.keys(ratings).forEach((key) => {

      if (!ratings[key]) {

        newErrors[key] = true;

      }

    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

const submitHandler = async (e) => {

  e.preventDefault();

  console.log("Submit Clicked");

  console.log("Form Data:", formData);

  console.log("Ratings:", ratings);

  if (!validateForm()) {

    console.log("Validation Failed");

    return;

  }

  console.log("Validation Passed");

  try {

    console.log("Sending Request");

    const res = await API.post(
      "/feedback",
      {
        ...formData,
        ratings,
        type: "OPD",
      }
    );

    console.log("Success", res.data);

    navigate("/thank-you");

  } catch (error) {

    console.log("ERROR:", error);

    console.log(
      "Response:",
      error.response
    );

    console.log(
      "Data:",
      error.response?.data
    );

    alert("Submission Failed");

  }

};
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

  return (

    <div className="premium-feedback-page">

      <div className="premium-feedback-card">
        <Link to="/">
          <button className="back-btn">
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
                onChange={handleInput}
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

          {/* TABLE */}

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
                            ratings[
                            service.field
                            ] === item
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
              className={`premium-comment-box ${errors.comment
                  ? "premium-error-input"
                  : ""
                }`}
            ></textarea>

          </div>

          {/* BUTTON */}

          <div className="premium-submit-area">

            <button
              type="submit"
              className="premium-submit-btn"
            >
              Submit Feedback
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default FeedbackForm;