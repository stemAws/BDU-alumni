import { useEffect, useState } from "react";
import "../styles/Chapters.css";
import Button from "../component/Button";
const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chaptersToShow, setchaptersToShow] = useState(3);
  const handleSeemore = () => {
    setchaptersToShow(chaptersToShow + 3);
  };
  const handleSeeless = () => {
    setchaptersToShow(chaptersToShow - 3);
  };
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/list-chapters`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setChapters(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chapters-container">
      <div className="chapters-title">
        {/* <div className="circle-bg"></div> */}
        <p>
          <span className="blue-text">Clubs</span>
        </p>
      </div>
      {/* <div className="circle-bg3" /> */}
      {/* <div className="circle-bg4" />
      <div className="circle-bg5" /> */}
      <div className="ind-chapters-cont">
        {chapters.length === 0 ? (
          <div className="no-chapters">
            <p>No chapters posted</p>
          </div>
        ) : (
          chapters
            .slice(-chaptersToShow)
            .reverse()
            .map((chapter, index) => (
              <div key={index} className="ind-chapters">
                <h4>{chapter.chapterName}</h4>
                <p>{chapter.description}</p>
                {chapter.website && (
                  <a
                    href={chapter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      type="button"
                      className="btn-btn"
                      onClick={() => window.open(chapter.website, "_blank")}
                    >
                      Join
                    </button>
                  </a>
                )}
              </div>
            ))
        )}
      </div>
      <div className="buttons">
        {chaptersToShow < chapters.length && (
          <Button
            className={`see-more`}
            onClick={() => handleSeemore()}
            text={"More"}
          />
        )}
        {chaptersToShow > 3 && (
          <Button
            className={`see-less`}
            onClick={() => handleSeeless()}
            text={"Less"}
          />
        )}
      </div>
    </div>
  );
};

export default Chapters;
