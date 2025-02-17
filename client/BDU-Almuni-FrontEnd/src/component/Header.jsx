import NavBar from "./NavBar";
import "../styles/header.css";
import { useLocation } from "react-router-dom";
import background from "../assets/images/photo_2024-02-25_15-58-46.jpg";
import { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { SigninContext } from "../pages/MainPage";
import useAuth from "./useAuth";
const Header = ({ logout }) => {
  const { loginState, setsignin } = useContext(SigninContext);
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setimageUrl] = useState();
  const { userId } = useAuth();
  console.log(userId);

  useEffect(() => {
    if (!userId) return; // Prevent fetching with null userId

    const fetchProfilePictureUrl = async () => {
      try {
        console.log("Fetching profile picture for user Id:", userId);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/getProfilePicture/${userId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch profile picture URL: ${res.status} - ${res.statusText}`
          );
        }

        const url = await res.text();
        setimageUrl(url);
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details for user Id:", userId);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/alumni/${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          setError("Failed to fetch user details");
        }
      } catch (error) {
        setError("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchProfilePictureUrl();
  }, [userId]); // Runs only when userId is updated

  return (
    <div>
      {/* <div className="overlay"> */}
      <NavBar
        logout={logout}
        loginState={loginState}
        userDetails={userDetails}
        loading={loading}
        error={error}
        imgUrl={imageUrl}
      />

      {location.pathname === "/" && (
        <div className="header-container">
          <div className="overlay" />
          <img className="background-img" src={background} alt="" />
          <div className="wellcome-text">
            <p className="top-title">Welcome to Bahir Dar University Alumni</p>
            <p className="bottom-title">
              Connecting the past, shaping the future. Join our alumni network
              to stay informed, get involved, and give back. Together, we can
              create opportunities and build a stronger community.
            </p>
            <div className="main-page-buttons">
              {!loginState && (
                <Button
                  id={"signin-btn"}
                  onClick={() => setsignin(true)}
                  text="SIGN IN"
                />
              )}
              <Link to="/explore">
                {" "}
                <Button className={"transparent-btn"} text="EXPLORE" />
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default Header;
