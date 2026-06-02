import axios from "axios";

const API = axios.create({
  baseURL: "https://utkalpatient-feedback-backend.onrender.com/api",
});

export default API;
