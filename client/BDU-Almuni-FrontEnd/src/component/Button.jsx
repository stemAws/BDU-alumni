const Button = ({id,text,onClick,className,disabled,type}) => {
  return (
    <button id={id} className={`btn ${className}`} onClick={onClick} type={type}disabled ={disabled} >{text} </button>
  )
}
Button.defaultProps={
disabled:false,
type:'none',
}
export default Button