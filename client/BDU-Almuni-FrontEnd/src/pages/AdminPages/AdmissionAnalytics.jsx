import { useEffect, useState } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";

const AdmissionAnalytics = () => {
  const [admissionCount, setAdmissionCount] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchAdmissionCount(selectedYear);
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
      fetchAdmissionCount(sortedYears[0]); // Fetch data for the initial year

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchAdmissionCount = async (year) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admission-count?graduatingYear=${year}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      const admissionData = transformDegreeCountToPiedata(data);
      setAdmissionCount(admissionData);
    } catch (error) {
      console.error("Error fetching university count:", error);
      setAdmissionCount([]);
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

  if (!admissionCount || admissionCount.length === 0) {
    return <p className="no-data">No data available</p>;
  }

  return (
    <div className="chart5">
      <div className="selection-header">
        <h3 className="chartTitle">BDU Alumni Admission</h3>
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
      <ResponsiveContainer width="100%" height={500}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="35%"
          outerRadius="100%"
          barSize={10}
          data={admissionCount}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={5}
            label={renderCustomizedLabel}
          >
            {admissionCount.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </RadialBar>

          <Tooltip
            content={({ payload, label }) => {
              if (payload && payload.length) {
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <p>{`Admission: ${payload[0].payload.name}`}</p>
                    <p>{`Count: ${payload[0].payload.value}`}</p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ fill: "transparent" }}
          />

          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="middle"
            wrapperStyle={{
              bottom: "0",
              right: "",
              transform: "translate(0, -50%)",
              lineHeight: "24px",
            }}
            payload={admissionCount.map((entry, index) => ({
              value: entry.name,
              type: "circle",
              color: COLORS[index % COLORS.length],
            }))}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdmissionAnalytics;
