import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const Story = ({story}) => {
  return (
    <Link to={`stories/${story.postId}`}>
    <div className="each-story">
              {story.img&&(<img className="story-img"src={story.img} alt="" />) } 
            <div className={`${story.img?"story-description-container":"story-description-container without"}`}>
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