import { FaArrowRight } from "react-icons/fa"

const Story = ({story}) => {
  return (
    <div className="each-story">
                <img className="story-img"src={story.img} alt="" />
            <div className="story-description-container">
                <p className="story-text">{story.description}</p>
                <p className="story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
  )
}

export default Story