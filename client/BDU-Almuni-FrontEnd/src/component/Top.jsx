import Button from './Button'
import { FaPlus } from 'react-icons/fa'
const Top = ({onAdd,showAddExperiance}) => {
  return (
    <header className="top">
    <h1>Experience</h1>
    <Button onClick={onAdd} text = {showAddExperiance? 'close':'add'} />
    
    </header>
  )
}

export default Top