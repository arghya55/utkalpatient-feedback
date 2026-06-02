import { useState, useEffect } from "react";

import "./GeneralFeedback.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const GeneralFeedbackForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    gender: "",
    mobile: "",
    feedback: "",
  });

  const [ratings, setRatings] = useState({
    cleanliness: 0,
    staffBehaviour: 0,
    environment: 0,
    overallExperience: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");

    setFormData((prev) => ({
      ...prev,
      date: today,
    }));

  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {

      const onlyNumber = value.replace(/\D/g, "");

      if (onlyNumber.length <= 10) {
        setFormData({
          ...formData,
          [name]: onlyNumber,
        });
      }

      return;
    }

    if (name === "age") {

      const onlyNumber = value.replace(/\D/g, "");

      if (onlyNumber.length <= 3) {
        setFormData({
          ...formData,
          [name]: onlyNumber,
        });
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.gender) {
      newErrors.gender = true;
    }

    if (!formData.mobile) {
      newErrors.mobile = true;
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = true;
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = true;
    }

    Object.keys(ratings).forEach((key) => {

      if (ratings[key] === 0) {
        newErrors[key] = true;
      }

    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!validateForm()) {

      alert("Please fill all required fields");

      return;
    }

    try {

      await API.post("/feedback", {
        ...formData,
        ratings,
        type: "GENERAL",
      });

      navigate("/thank-you");

    } catch (error) {

      console.log(error);

      alert("Submission Failed");

    }

  };

  const ratingFields = [
    {
      title: "Cleanliness",
      field: "cleanliness",
    },
    {
      title: "Staff Behaviour",
      field: "staffBehaviour",
    },
    {
      title: "Environment",
      field: "environment",
    },
    {
      title: "Overall Experience",
      field: "overallExperience",
    },
  ];

  return (

    <div className="general-page">

      <div className="general-card">

        <Link to="/">
          <button className="back-btn">
            Back To Home
          </button>
        </Link>

        <div className="general-header">
          GENERAL FEEDBACK FORM
        </div>

        <form
          onSubmit={submitHandler}
          className="general-form"
        >

          <div className="general-grid">

            <div className="general-input-group">
              <label>Date</label>
              <input
                type="text"
                value={formData.date}
                readOnly
              />
            </div>


            <div className="general-input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInput}
                className={
                  errors.gender
                    ? "general-error"
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

            <div className="general-input-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInput}
                maxLength="10"
                className={
                  errors.mobile
                    ? "general-error"
                    : ""
                }
              />
            </div>

          </div>

          {ratingFields.map((item) => (

            <div
              key={item.field}
              className="rating-card"
            >

              <h3
                className={
                  errors[item.field]
                    ? "rating-error"
                    : ""
                }
              >
                {item.title}

                {errors[item.field] && (
                  <span>
                    {" "}* Required
                  </span>
                )}
              </h3>

              <div className="star-row">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    className={
                      ratings[item.field] >= star
                        ? "star-active"
                        : "star-btn"
                    }
                    onClick={() =>
                      setRatings({
                        ...ratings,
                        [item.field]: star,
                      })
                    }
                  >
                    ★
                  </button>

                ))}

              </div>

            </div>

          ))}

          <div className="general-input-group">

            <label>
              Feedback / Suggestions
            </label>

            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInput}
              className={
                errors.feedback
                  ? "general-error"
                  : ""
              }
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Feedback
          </button>

        </form>

      </div>

    </div>

  );
};

export default GeneralFeedbackForm;
