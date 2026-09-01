import { useState, useEffect } from 'react';
import './GeneralFeedback.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const GeneralFeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    gender: '',
    email: '',
    mobile: '',
    feedback: '',
  });
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    staffBehaviour: 0,
    environment: 0,
    overallExperience: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SET TODAY'S DATE
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');
    const [day, month, year] = today.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData((prev) => ({
      ...prev,
      date: today,
    }));
  }, []);

  // HANDLE INPUT
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const onlyNumber = value.replace(/\D/g, '');
      if (onlyNumber.length <= 10) {
        setFormData((prev) => ({ ...prev, mobile: onlyNumber }));
      }
      return;
    }
    if (name === 'name') {
      const onlyText = value.replace(/[^A-Za-z\s.]/g, '');
      setFormData((prev) => ({ ...prev, name: onlyText }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE RATING
  const handleRating = (field, value) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.gender) newErrors.gender = true;
    if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = true;
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
    }
    if (!formData.feedback.trim()) newErrors.feedback = true;
    Object.keys(ratings).forEach((key) => {
      if (ratings[key] === 0) newErrors[key] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) {
      alert('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    const payload = { ...formData, ratings, type: 'GENERAL' };
    
    navigate('/thank-you', { replace: true });

    try {
      await API.post('/feedback', payload);
    } catch (error) {
      console.error('Background feedback submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingFields = [
    { title: 'Cleanliness', field: 'cleanliness' },
    { title: 'Staff Behaviour', field: 'staffBehaviour' },
    { title: 'Environment', field: 'environment' },
    { title: 'Overall Experience', field: 'overallExperience' },
  ];

  return (
    <div className="general-page">
      <div className="general-card">
        <Link to="/">
          <button type="button" className="back-btn">Back To Home</button>
        </Link>
        <div className="general-header">GENERAL FEEDBACK FORM</div>
        <form onSubmit={submitHandler} className="general-form">
          <div className="general-grid">
            <div className="general-input-group">
              <label>Date</label>
              <input type="text" value={formData.date} readOnly />
            </div>
            <div className="general-input-group">
              <label>Name <span className="star">*</span></label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInput}
                className={errors.name ? 'general-error' : ''}
              />
            </div>
            <div className="general-input-group">
              <label>Gender <span className="star">*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInput}
                className={errors.gender ? 'general-error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="general-input-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInput}
                className={errors.email ? 'general-error' : ''}
              />
            </div>
            <div className="general-input-group">
              <label>Mobile Number <span className="star">*</span></label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={handleInput}
                maxLength={10}
                inputMode="numeric"
                className={errors.mobile ? 'general-error' : ''}
              />
            </div>
          </div>
          {ratingFields.map((item) => (
            <div key={item.field} className="rating-card">
              <h3 className={errors[item.field] ? 'rating-error' : ''}>
                {item.title} <span className="star">*</span>
                {errors[item.field] && <span>Please select a rating</span>}
              </h3>
              <div className="star-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} star rating`}
                    className={ratings[item.field] >= star ? 'star-active' : 'star-btn'}
                    onClick={() => handleRating(item.field, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="general-input-group">
            <label>Feedback / Suggestions <span className="star">*</span></label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInput}
              placeholder="Write your valuable feedback or suggestions..."
              className={errors.feedback ? 'general-error' : ''}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralFeedbackForm;
