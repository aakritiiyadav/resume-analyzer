import { useState } from "react";
import { uploadResume } from "../api";

export default function UploadPage({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await uploadResume(formData);
      onResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-6">Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-violet-600 px-6 py-3 rounded-lg"
      >
        {loading ? "Analyzing..." : "Upload Resume"}
      </button>
    </div>
  );
}