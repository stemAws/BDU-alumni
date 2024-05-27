
import Education from "./Education"
const Educations = ({onclose,onEdit,educations,onDelete,ondisplay}) => {
  return ( 
    <>
    {educations.slice().reverse().map(
      (education,index)=>
      <Education 
      key={index} 
      education={education} 
      onDelete={onDelete}
      onEdit={onEdit}
      ondisplay={ondisplay}
      onclose={onclose}
      />)
      }
    </>
  )
}

export default Educations