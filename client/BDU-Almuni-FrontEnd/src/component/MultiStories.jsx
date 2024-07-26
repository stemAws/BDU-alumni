import Story from "./Story"
const MultiStories = ({stories}) => {
  console.log(stories)
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