import { useEffect, useState } from "react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAtom,
  FaCalendarAlt,
  FaIndustry,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaSlidersH,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import MultipleProfiles from "../component/MultipleProfiles";
import "../styles/searchAndFilter.css";

const SearchAndFilter = () => {
  const { name } = useParams();
  const [searchBy, setSearchBy] = useState("");
  const [adjustingInputs, setAdjustingInputs] = useState({
    graduatingYear: false,
    location: false,
    industry: false,
    department: false,
  });
  const [input, setInput] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleEachOption = (value) => {
    setSearchBy(value);
    setAdjustingInputs((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/alumni-directory`,
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: `%${name || ""}%`,
              searchBy: searchBy || null,
              searchByValue: input ? `%${input}%` : null,
            }),
          }
        );

        if (response.ok) {
          const json = await response.json();
          setProfiles(json);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        console.error("Error during fetching alumni data:", error);
        setProfiles([]);
      }
    };

    fetchData();
  }, [name, searchBy, input]);

  return (
    <div className="searchAndFilter-container">
      <div className="left-side">
        <div className="filter-top">
          <div>
            <FaSlidersH />
            <p>Filter</p>
          </div>
        </div>
        <div className="filter-bottom">
          {["graduatingYear", "location", "industry", "department"].map(
            (option) => (
              <div className="filter-option" key={option}>
                <div
                  onClick={() => handleEachOption(option)}
                  className="iconsAndOptions"
                >
                  <div>
                    {option === "graduatingYear" && <FaCalendarAlt />}
                    {option === "location" && <FaMapMarkerAlt />}
                    {option === "industry" && <FaIndustry />}
                    {option === "department" && <FaAtom />}
                    <p>
                      {option.charAt(0).toUpperCase() +
                        option.slice(1).replace("Year", " Year")}
                    </p>
                  </div>
                  {adjustingInputs[option] ? (
                    <FaAngleDoubleUp size={10} />
                  ) : (
                    <FaAngleDoubleDown size={10} />
                  )}
                </div>
                {adjustingInputs[option] && (
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    className="dropDown-input"
                    type={option === "graduatingYear" ? "number" : "text"}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div className="right-side">
        {profiles.length > 0 ? (
          <MultipleProfiles profiles={profiles} />
        ) : (
          <p style={{ margin: "200px 250px" }}>
            <FaQuestionCircle /> No User Found With Name {name}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
