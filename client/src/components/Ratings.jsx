import "./Ratings.css";

const Ratings = ({ label, value, onChange }) => {
  return (
    <div className="rating-card">

      <div className="rating-header">

        <h3 className="rating-title">
          {label}
        </h3>

        <span className="rating-value">
          {value}/5
        </span>

      </div>

      <div className="rating-stars">

        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`rating-star-btn ${
              value >= star
                ? "rating-star-active"
                : ""
            }`}
          >
            ★
          </button>
        ))}

      </div>

    </div>
  );
};

export default Ratings;