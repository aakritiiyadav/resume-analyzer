import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const SkillChart = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const data = skills.map((skill) => ({
    name: skill,
    value: 1,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Skills Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;