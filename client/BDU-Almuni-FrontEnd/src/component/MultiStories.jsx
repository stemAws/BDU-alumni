import Story from "./Story"
const MultiStories = ({stories}) => {
  return (
    <>
        {stories.reverse().map((story,index)=>{
          return(
          <Story
          story={story}
          key={index}
          />
        )  
        })}
    </>
  )
}

export default MultiStories