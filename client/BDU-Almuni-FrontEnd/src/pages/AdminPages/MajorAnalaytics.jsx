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

  const formatName = (originalName) => {
    return originalName
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

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
        `${import.meta.env.VITE_BACKEND_URL}/grad-year`
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
        }/majors-count?graduatingYear=${year}`
      );
      const data = await response.json();

      const transformedData = data.map(({ fieldOfStudy, count }) => ({
        name: formatName(fieldOfStudy),
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
              layout="vertical"
              width={500}
              height={500}
              data={Bardata}
              margin={{
                top: 25,
                right: 30,
                left: 200,
                bottom: 100,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" textAnchor="end" />
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
