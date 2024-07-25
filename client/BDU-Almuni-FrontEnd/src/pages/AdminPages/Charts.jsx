import "../../styles/charts.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function Chart() {
  // State variables
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [Bardata, setBardata] = useState([]);
  const [universityCount, setUniversityCount] = useState([]);
  const [jobCount, setJobCount] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial render

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/activeUsers`
      );
      const result = await response.json();
      setData(result);

      // Sort years in descending order
      const sortedYears = [...new Set(result.map((item) => item.year))].sort(
        (a, b) => b - a
      );

      // Set the default selected year to the largest year
      setAvailableYears(sortedYears);
      setSelectedYear(sortedYears[0]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const renderChart = () => {
    if (!loading && data.length > 0) {
      return (
        <ResponsiveContainer width={800} aspect={4 / 1}>
          <LineChart
            data={data.filter((item) => item.year === selectedYear)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              stroke="#0C8CE9"
              tickFormatter={(month) => month.slice(0, 3)}
            />
            <YAxis />
            <Line
              type="monotone"
              dataKey="uniqueUserCount"
              name="Active Users"
              stroke="#0C8CE9"
            />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="rgb(178, 217, 244)" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return <p>No data available</p>;
    }
  };

  // Function to format name (e.g., from camelCase to Title Case)
  const formatName = (originalName) => {
    return originalName
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Effect to fetch and set Bardata (STEM student's field of study)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/majors-Count`
        );
        const data = await response.json();

        // Transform the API response to match Bardata structure
        const transformedData = data.map(({ fieldOfStudy, count }) => ({
          name: formatName(fieldOfStudy),
          Total_number: count,
        }));

        // Sort the data in descending order based on Total_number
        transformedData.sort((a, b) => b.Total_number - a.Total_number);

        setBardata(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Effect to fetch and set PieData (STEM student's degree analysis)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const degreeCount = await fetchDegreeCount();
        const transformedData = transformDegreeCountToPiedata(degreeCount);
        setPieData(transformedData);
      } catch (error) {
        console.error("Error fetching and setting degree count:", error);
      }
    };

    fetchData();
  }, []);

  // Function to fetch STEM student's degree count from backend
  const fetchDegreeCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/degree-count`
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

  // Function to transform STEM student's degree count to PieData format
  const transformDegreeCountToPiedata = (degreeCount) => {
    return Object.keys(degreeCount[0]).map((degree) => ({
      name: degree.toUpperCase(),
      value: degreeCount[0][degree],
    }));
  };
  const formatJobTitle = function (jobTitle) {
    // Check if the job title contains a comma
    if (jobTitle.includes(",")) {
      // Split the job title at the comma
      const jobTitleParts = jobTitle.split(", ");

      // Join the parts with a line break
      return jobTitleParts.join("\n");
    } else {
      // If no comma, split by space
      const jobTitleParts = jobTitle.split(" ");

      // Join the parts with a line break
      return jobTitleParts.join("\n");
    }
  }
  

  // Effect to fetch and set JobCount (STEM student's job title analysis)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/job-count`
        );
        const data = await response.json();

        const transformedData = data.map(({ jobTitle, count }) => ({
          jobCategory: formatJobTitle(jobTitle), // X-axis value
          count, // Y-axis value
        }));

        // Sort the data in descending order based on count
        transformedData.sort((a, b) => b.count - a.count);

        setJobCount(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Custom XAxis component for multiline labels
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
  // Colors for the RadialBarChart
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

  // Function to fetch university count from backend
  // const fetchUniversityCount = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/universityCount`
  //     );
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching university count:", error);
  //     return [];
  //   }
  // };

  // Custom label renderer for RadialBarChart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Check if y is a valid number
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

    // Return null if y is NaN
    return null;
  };

  // Effect to fetch and set university count
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchUniversityCount();
  //     setUniversityCount(data);
  //   };

  //   fetchData();
  // }, []);

  // if (!universityCount || universityCount.length === 0) {
  //   return <p className="no-data">No data available</p>;
  // }

  return (
    <div className="chart">
      <div className="chart1">
        <div className="selection-header">
          <h3 className="chartTitle">User Analytics</h3>
          <div className="selection">
            <label>Year:</label>
            {/* Remove the default "Select year" option */}
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
        {renderChart()}
        {loading && <p>Loading...</p>}
      </div>

      <div className="chart2">
        <h3 className="chartTitle">
          {" "}
          STEM students based on geographical location
        </h3>

        <iframe
          className="geo_chart"
          title="Geographical Representation"
          src={"https://geo-marked-users.netlify.app"}
        ></iframe>
      </div>
      <div className="chart3">
        <h3 className="chartTitle">STEM student's Degree Analysis</h3>
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
      <div className="chart4">
        <h3 className="chartTitle"> STEM Students Field of Study</h3>
        <ResponsiveContainer width="100%" height={750}>
          <BarChart
            layout="vertical"
            width={500}
            height={500}
            data={Bardata}
            margin={{
              top: 25,
              right: 30,
              left: 90,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" textAnchor="end" />
            <Tooltip />
            <Bar
              dataKey="Total_number"
              fill="#8884d8"
              barSize={40}
              label={{ position: "right", fill: "#8884d8" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="chart5">
        <h3 className="chartTitle">STEM students university analysis</h3>
        <ResponsiveContainer width="100%" height={500}>
          <RadialBarChart
            cx="70%"
            cy="50%"
            innerRadius="35%"
            outerRadius="100%"
            barSize={10}
            data={universityCount}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="count"
              cornerRadius={5}
              label={renderCustomizedLabel}
            >
              {universityCount.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </RadialBar>

            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={{
                top: "50%",
                right: "",
                transform: "translate(0, -50%)",
                lineHeight: "24px",
              }}
              payload={universityCount.map((entry, index) => ({
                value: entry.institution,
                type: "circle",
                color: COLORS[index % COLORS.length],
              }))}
            />
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
                      <p>{`Institution: ${payload[0].payload.institution}`}</p>
                      <p>{`Count: ${payload[0].payload.count}`}</p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ fill: "transparent" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>  */}

       <div className="chart6">
        <h3 className="chartTitle"> STEM Students Job Title</h3>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            width={500}
            height={500}
            data={jobCount}
            margin={{
              top: 25,
              right: 30,
              left: 90,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis
              type="category"
              dataKey="jobCategory"
              axisLine={false}
              tick={<CustomXAxis />}
              height={100} // Adjust the height to accommodate multiline labels
            />
            <YAxis type="number" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#8884d8"
              barSize={40}
              label={{ position: "right", fill: "#8884d8" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
