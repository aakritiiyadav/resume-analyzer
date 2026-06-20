import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const uploadResume = (formData) =>
  API.post("/upload-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });