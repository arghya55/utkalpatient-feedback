import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OPDFeedback from "./pages/FeedbackForm";
import IPDFeedback from "./pages/IpdFeedbackForm";
import GeneralFeedbackForm from "./Pages/GeneralFeedback";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ThankYou from "./pages/ThankYou";

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