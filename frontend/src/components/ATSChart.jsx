import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ATSChart = ({ score, experience }) => {
  const data = [
    {
      name: "ATS Score",
      value: score,
    },
    {
      name: "Experience",
      value: experience,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ATSChart;