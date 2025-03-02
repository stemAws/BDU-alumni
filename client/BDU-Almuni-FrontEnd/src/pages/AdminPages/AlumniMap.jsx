import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/AlumniMap.css";
import countryCoordinatesMapping from "../../component/country";
import locationPin from "../../assets/location-pin.png";

const getCountryCoordinates = (country) =>
  countryCoordinatesMapping[country] || [0, 0];

const AlumniMap = () => {
  const [markers, setMarkers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/geoData`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data.filter((item) => item.country !== null));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const fetchUserData = (country) => {
    setLoadingUsers(true);
    setSelectedCountry(country);

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/userDataByCountry?country=${encodeURIComponent(country)}`,
      { credentials: "include" }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoadingUsers(false);
        setShowModal(true); // 🔹 Open modal AFTER data is loaded
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoadingUsers(false);
      });
  };

  const createCustomIcon = () =>
    L.divIcon({
      className: "custom-marker",
      html: `<div class="custom-icon">
              <img src="${locationPin}" alt="Location Pin"/>
            </div>`,
      iconSize: [40, 40],
    });

  return (
    <div>
      {loading ? (
        <p className="loading-text">Loading map data...</p>
      ) : (
        <MapContainer
          center={[0, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={18}
          className="map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map(({ country, count }) => (
            <Marker
              key={country}
              position={getCountryCoordinates(country)}
              icon={createCustomIcon()}
              eventHandlers={{ click: () => fetchUserData(country) }}
            >
              <Popup>BDU Alumni in {`${country}: ${count}`}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
            >
              ✖
            </button>
            <h3>BDU Alumni in {selectedCountry}</h3>
            {loadingUsers ? (
              <p className="loading-text">Loading user data...</p>
            ) : (
              <div
                className={`user-list ${
                  userData.length > 3 ? "scrollable" : ""
                }`}
              >
                {userData.map((user) => (
                  <div key={user.username} className="user-item">
                    <div className="user-field">
                      <strong>Name:</strong> <span>{user.fullName}</span>
                    </div>
                    <div className="user-field">
                      <strong>Gender:</strong> <span>{user.gender}</span>
                    </div>
                    <div className="user-field">
                      <strong>Profile link:</strong>
                      <a
                        href={`http://localhost:5173/ProfilePage/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.fullName}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniMap;
