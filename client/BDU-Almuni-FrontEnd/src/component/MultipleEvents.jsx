import EachEvent from "./EachEvent"

const MultipleEvents = ({events,eventsToShow}) => {
  return (
   <>
   {
    events.slice(-eventsToShow).reverse().map((singleEvent,index)=>{
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