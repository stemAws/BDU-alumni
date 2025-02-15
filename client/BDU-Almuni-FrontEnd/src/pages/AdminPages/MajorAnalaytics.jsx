import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const MajorAnalytics = () => {
  const [Bardata, setBardata] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatName = (major) => major.split(" ").join("\n");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchMajorData(selectedYear);
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

      if (sortedYears.length > 0) {
        setAvailableYears(sortedYears);
        setSelectedYear(sortedYears[0]); // Set the latest year as the default
        fetchMajorData(sortedYears[0]); // Fetch data for the initial year
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchMajorData = async (year) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/majors-count?graduatingYear=${year}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      const transformedData = data.map(({ fieldOfStudy, count }) => ({
        Major: formatName(fieldOfStudy),
        Count: count,
      }));

      transformedData.sort((a, b) => b.Count - a.Count);

      setBardata(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  const CustomXAxis = ({ x, y, payload }) => {
    const lines = payload.value.split("\n");
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 15}
            dy={15}
            textAnchor="end"
            fill="#666"
            transform="rotate(-45)"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <>
      <div className="chart4">
        <div className="selection-header">
          <h3 className="chartTitle">BDU Alumni Majors</h3>
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
        {Bardata.length === 0 ? (
          <p className="no-data">No data available for the selected year</p>
        ) : (
          <ResponsiveContainer width="100%" height={750}>
            <BarChart
              width={500}
              height={500}
              data={Bardata}
              margin={{
                top: 25,
                right: 30,
                left: 0,
                bottom: 100,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis
                type="category"
                dataKey="Major"
                axisLine={false}
                tick={<CustomXAxis />}
                height={100} // Adjust the height to accommodate multiline labels
              />
              <YAxis type="number" />
              <Tooltip />
              <Bar
                dataKey="Count"
                fill="#8884d8"
                barSize={40}
                label={{ position: "right", fill: "#8884d8" }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default MajorAnalytics;
