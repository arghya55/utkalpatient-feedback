import "./Thankyou.css";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <section className="thankyou-page">

      <div className="thankyou-card">

        <div className="thankyou-icon">
          🎉
        </div>

        <h1 className="thankyou-title">
          Thank You!
        </h1>

        <p className="thankyou-description">
          Your feedback has been submitted
          successfully.
        </p>

<Link to="/">
  <button className="thankyou-btn">
    Back To Home
  </button>
</Link>
      </div>

    </section>
  );
};

export default ThankYou;
