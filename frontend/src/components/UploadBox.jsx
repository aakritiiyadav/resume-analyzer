import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    console.log("Button clicked");

    if (!file) {
      alert("Select a file first");
      return;
    }

    console.log("Selected file:", file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post(
        "/api/upload-resume",
        formData
      );

      console.log("Backend response:", response.data);

      localStorage.setItem(
        "resumeData",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => {
          console.log("File selected");
          setFile(e.target.files[0]);
        }}
        className="w-full border border-[#DCCBF0] p-3 bg-[#F9F6FC]"
      />

      <button
        type="button"
        onClick={handleUpload}
        className="bg-[#9B7BC4] text-white px-8 py-3"
      >
        Upload Resume
      </button>

    </div>
  );
};

export default UploadBox;