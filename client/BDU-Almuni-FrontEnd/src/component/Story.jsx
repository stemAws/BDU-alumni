import { FaArrowRight } from "react-icons/fa"

const Story = ({story}) => {
  return (
    <div className="each-story">
              {story.img&&(<img className="story-img"src={story.img} alt="" />) } 
            <div className={`${story.img?"story-description-container":"story-description-container without"}`}>
                <p className="story-text">{story.content}</p>
                <p className="story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
  )
}

export default Story