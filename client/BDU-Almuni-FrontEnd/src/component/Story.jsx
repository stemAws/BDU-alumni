import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const Story = ({story}) => {
  return (
    <Link to={`stories/${story.postId}`}>
    <div className="each-story">
              {story.mediaPath&&(<img className="story-img"src={story.mediaPath} alt="" />) } 
            <div className={`${story.mediaPath?"story-description-container":"story-description-container without"}`}>
                <p className="story-text">{story.content}</p>
                    <p className="story-readmore">
                        Read more <FaArrowRight/>
                    </p>
            </div>
        </div>
        </Link>
  )
}

export default Story