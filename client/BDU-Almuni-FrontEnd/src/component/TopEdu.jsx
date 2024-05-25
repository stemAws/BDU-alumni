import Button from './Button'
const TopEdu = ({onAddEdu,showAddEducation}) => {
  return (
    <header className="top">
    <h1>Educational Background</h1>
    <Button onClick={onAddEdu} text = {showAddEducation? 'close':'add'}/>
    
    </header>
  )
}

export default TopEdu