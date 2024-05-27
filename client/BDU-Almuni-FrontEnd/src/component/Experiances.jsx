import Experiance from "./Experiance"
const Experiances = ({onclose,experiances,onDelete,onEdit,ondisplay}) => {
    
  return ( 
    <>
    {experiances.slice().reverse().map(
      (experiance,index)=>
      <Experiance 
      key={index} 
      experiance={experiance} 
      onDelete={onDelete}
      onEdit={onEdit}
      ondisplay={ondisplay}
      onclose={onclose}
      />)
      }
    </>
  )
}

export default Experiances