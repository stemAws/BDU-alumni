import '../styles/sign.css'
import { useState } from 'react';
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="form_input">
      <label htmlFor={props.id}>{props.label}</label>
        <input 
        {...props}  
        id={props.id}
        type={props.type}
        className={props.className}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        required={props.required}
        pattern={props.pattern}
        onBlur={handleFocus}
        onFocus={() =>
          props.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        />
        <span className='error'>{props.errorText}</span>
        </div>
  )
}

export default FormInput