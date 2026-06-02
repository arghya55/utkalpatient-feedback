import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import OPDFeedback from "./Pages/FeedbackForm";
import IPDFeedback from "./Pages/IpdFeedbackForm";
import GeneralFeedbackForm from "./Pages/GeneralFeedback";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ThankYou from "./Pages/Thankyou";

import "./index.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/opd-feedback"
          element={<OPDFeedback />}
        />

        <Route
          path="/ipd-feedback"
          element={<IPDFeedback />}
        />

        <Route
          path="/gnrl-feedback"
          element={<GeneralFeedbackForm />}
        />

        <Route
  path="/thank-you"
  element={<ThankYou />}
/>


      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
