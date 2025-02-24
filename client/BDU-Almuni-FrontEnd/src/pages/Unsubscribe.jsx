import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import "../styles/unsubscribe.css";

const Unsubscribe = () => {
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/unsubscribe`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUnsubscribed(true);
      } else {
        setError(data.message || "Failed to unsubscribe. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  if (unsubscribed) {
    return (
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="BDU Logo" />
          </Link>
          <p>BDU ALUMNI</p>
        </div>
        <div className="unsub-container">
          <h2 className="unsubscribed">
            You have successfully unsubscribed from Bahir Dar University Alumni
            email updates.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="unsubscribe-container">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="BDU Logo" />
        </Link>
        <p>BDU ALUMNI</p>
      </div>
      <h2 className="unsubscribe-title">Update your email settings</h2>
      <div className="unsub-content">
        <h3 className="unsub-title">Unsubscribe</h3>
        <p className="unsubscribe-content">
          You are currently subscribed to receive BDU Alumni event updates,
          news, and announcements. BDU Alumni Network provides valuable
          resources, networking opportunities, and career support.
        </p>
        <p className="unsubscribe-content">
          To unsubscribe, enter your email and click the button below.
        </p>

        <div className="unsub-input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`unsub-email-input ${error ? "unsub-error-border" : ""}`}
          />
          <button className="unsub-button" onClick={handleClick}>
            Unsubscribe
          </button>
        </div>

        {error && <p className="unsub-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Unsubscribe;
