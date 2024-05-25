import EachEvent from "./EachEvent"

const MultipleEvents = ({events}) => {
  return (
   <>
   {
    events.slice(-3).reverse().map((singleEvent,index)=>{
        return(
            <EachEvent 
            singleEvent={singleEvent}
            key={index}
            />
        )
    })
   }
   </>
  )
}

export default MultipleEvents