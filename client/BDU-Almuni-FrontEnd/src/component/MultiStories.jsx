import Story from "./Story"
const MultiStories = ({stories}) => {
  return (
    <>
        {stories.slice(-3).reverse().map((story,index)=>{
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