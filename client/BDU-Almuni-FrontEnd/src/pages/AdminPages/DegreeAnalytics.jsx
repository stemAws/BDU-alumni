import { useEffect, useState } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DegreeAnalytics = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchDegreeData(selectedYear);
    }
  }, [selectedYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/grad-year`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      const sortedYears = [...new Set(result.map((item) => item.year))].sort(
        (a, b) => b - a
      );

      setAvailableYears(sortedYears);
      setSelectedYear(sortedYears[0]);
      fetchDegreeData(sortedYears[0]); // Fetch data for the initial year

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchDegreeData = async (year) => {
    try {
      const degreeCount = await fetchDegreeCount(year);
      const transformedData = transformDegreeCountToPiedata(degreeCount);
      setPieData(transformedData);
    } catch (error) {
      console.error("Error fetching and setting degree count:", error);
    }
  };

  const fetchDegreeCount = async (year) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/degree-count?graduatingYear=${year}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const degreeCount = await response.json();
      return degreeCount;
    } catch (error) {
      console.error("Error fetching degree count:", error);
      throw error;
    }
  };

  const transformDegreeCountToPiedata = (degreeCount) => {
    if (degreeCount.length === 0) return [];

    const countObject = degreeCount[0];

    return Object.entries(countObject).map(([degree, value]) => ({
      name: degree.toUpperCase(),
      value,
    }));
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    if (!isNaN(y)) {
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${value}`}
        </text>
      );
    }
    return null;
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF0000",
    "#800080",
    "#A52A2A",
    "#DEB887",
    "#5F9EA0",
    "#7FFF00",
    "#D2691E",
  ];
  if (!pieData || pieData.length === 0) {
    return <p className="no-data">No data available</p>;
  }
  return (
    <div className="chart3">
      <div className="selection-header">
        <h3 className="chartTitle">BDU Alumni Degree</h3>
        <div className="selection">
          <label>Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="selections"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={400} height={450}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DegreeAnalytics;
