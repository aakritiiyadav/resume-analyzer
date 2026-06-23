import { useEffect, useState } from "react";
import API from "../services/api";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/api/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadReport = (resume) => {
    const blob = new Blob(
      [JSON.stringify(resume, null, 2)],
      { type: "application/json" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-report.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F9F6FC] px-6 md:px-14 py-12">

      <h1 className="text-4xl font-bold mb-10 text-[#2D1E3E]">
        Resume History
      </h1>

      <div className="space-y-6">
        {history.map((resume, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-[#DCCBF0] shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">
              {resume.email}
            </h2>

            <p>ATS Score: {resume.ats_score?.total_score}%</p>
            <p>Skills: {resume.skills?.join(", ")}</p>
            <p>Education: {resume.education?.join(", ")}</p>

            <button
              onClick={() => downloadReport(resume)}
              className="mt-4 bg-[#9B7BC4] text-white px-5 py-2"
            >
              Download Report
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default History;