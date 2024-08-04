import "../../styles/charts.css";
import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DegreeAnalytics from "../AdminPages/DegreeAnalytics";
import AdmissionAnalytics from "../AdminPages/AdmissionAnalytics";
import MajorAnalaytics from "../AdminPages/MajorAnalaytics";

export default function Chart() {
  // State variables

  const [jobCount, setJobCount] = useState([]);
  const [industryCount, setIndustryCount] = useState([]);
  const [companyCount, setCompanyCount] = useState([]);

  // function countOccurrences(string, letter) {
  //   return string.split("").filter((char) => char === letter).length;
  // }

  // const formatInput = (input) => {
  //   if (countOccurrences(input, " ") > 2) {
  //     const words = input.split(" "); // Split the input into words
  //     const lines = [];

  //     for (let i = 0; i < words.length; i += 2) {
  //       const pair = words.slice(i, i + 2).join(" "); // Take pairs of words
  //       lines.push(pair); // Format each pair and add to lines
  //     }
  //     console.log(lines.join("\n"));
  //     // for(const line of lines){
  //     //   line.replace()
  //     // }
  //     return lines.join("\n"); // Join the lines with newlines
  //   }
  //   return formatName(input);
  // };

  const formatJobTitle = function (jobTitle) {
    if (jobTitle.includes(",")) {
      const jobTitleParts = jobTitle.split(", ");

      return jobTitleParts.join("\n");
    } else {
      const jobTitleParts = jobTitle.split(" ");

      return jobTitleParts.join("\n");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/job-count`
        );
        const data = await response.json();

        const transformedData = data.map(({ jobTitle, count }) => ({
          jobCategory: formatJobTitle(jobTitle),
          count,
        }));

        transformedData.sort((a, b) => b.count - a.count);

        setJobCount(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/industry-count`
        );
        const data = await response.json();

        const transformedData = data.map(({ industry, count }) => ({
          industryCategory: formatJobTitle(industry),
          count,
        }));

        transformedData.sort((a, b) => b.count - a.count);

        setIndustryCount(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/company-count`
        );
        const data = await response.json();

        const transformedData = data.map(({ company, count }) => ({
          companyCategory: formatJobTitle(company),
          count,
        }));

        transformedData.sort((a, b) => b.count - a.count);

        setCompanyCount(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="chart">
      {/* <div className="chart1">
        <div className="selection-header">
          <h3 className="chartTitle">User Analytics</h3>
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
        {renderChart()}
        {loading && <p>Loading...</p>}
      </div> */}

      <div className="chart2">
        <h3 className="chartTitle">
          {" "}
          BDU Alumni based on geographical location
        </h3>

        <iframe
          className="geo_chart"
          title="Geographical Representation"
          src={"https://geo-marked-users.netlify.app"}
        ></iframe>
      </div>

      <MajorAnalaytics />
      <DegreeAnalytics />
      <AdmissionAnalytics />
      <div className="chart6">
        <h3 className="chartTitle"> BDU Alumni Job Title</h3>
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
      <div className="chart6">
        <h3 className="chartTitle"> BDU alumni industry</h3>
        <ResponsiveContainer width="100%" height={750}>
          <BarChart
            layout="vertical"
            width={500}
            height={500}
            data={industryCount}
            margin={{
              top: 25,
              right: 30,
              left: 200,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis
              type="category"
              dataKey="industryCategory"
              axisLine={false}
              // tick={<CustomXAxis />}
              height={100}
            />
            <XAxis type="number" />
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
      <div className="chart6">
        <h3 className="chartTitle"> BDU alumni company</h3>
        <ResponsiveContainer width="100%" height={750}>
          <BarChart
            layout="vertical"
            width={500}
            height={500}
            data={companyCount}
            margin={{
              top: 25,
              right: 30,
              left: 200,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis
              type="category"
              dataKey="companyCategory"
              axisLine={false}
              // tick={<CustomXAxis />}
              height={100}
            />
            <XAxis type="number" />
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
