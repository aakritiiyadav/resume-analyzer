import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      // Validate file extension
      const ext = droppedFile.name.split(".").pop().toLowerCase();
      if (ext === "pdf" || ext === "docx") {
        setFile(droppedFile);
      } else {
        alert("Only PDF and DOCX files are supported");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/api/upload-resume", formData);
      localStorage.setItem("resumeData", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.detail || "Upload analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Custom File Target */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`w-full min-h-[220px] border-2 border-dashed rounded-none flex flex-col items-center justify-center p-6 transition-all duration-300 relative ${
          dragActive 
            ? "border-[#7C3AED] bg-purple-50/50" 
            : file 
              ? "border-emerald-300 bg-emerald-50/20" 
              : "border-purple-200 bg-[#FCFAFF]/50 hover:border-purple-300 hover:bg-purple-50/10"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        <label 
          htmlFor="file-upload" 
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {file ? (
            <div className="flex flex-col items-center text-center animate-float" style={{ animationDuration: '4s' }}>
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mb-4 shadow-sm">
                <FileText className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-base text-gray-800 mb-1 max-w-[280px] truncate">
                {file.name}
              </h4>
              <p className="text-xs text-gray-400 font-medium">
                {(file.size / 1024).toFixed(1)} KB • Click to change file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-purple-100/60 text-[#7C3AED] flex items-center justify-center rounded-full mb-4 border border-purple-200/30">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-[#2D1A47] text-base mb-1">
                Drag & Drop file here
              </h4>
              <p className="text-xs text-gray-400 font-medium mb-3">
                or click to browse from folders
              </p>
              <span className="text-[10px] bg-purple-100/60 text-[#7C3AED] px-3 py-1 font-bold">
                PDF or DOCX
              </span>
            </div>
          )}
        </label>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-gradient-purple text-white py-4 font-bold text-sm shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Analyzing Resume with Gemini...
          </>
        ) : (
          "Upload & Optimize"
        )}
      </button>

    </div>
  );
};

export default UploadBox;