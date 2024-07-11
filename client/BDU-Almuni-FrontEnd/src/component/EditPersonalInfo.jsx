import { FaPen, FaTimes } from 'react-icons/fa'
import '../styles/editPersonalInfo.css'
import { useEffect, useState } from 'react'
import ContactInfo from '../component/ContactInfo'
const EditPersonalInfo = ({handlePlaceholders,submitFile,personalInfo,forsocials,close,inputDirty,loading}) => {
    const [socialLinks,setSocialLinks]=useState(false);
    const [Discardpopup,setDiscardpopup]=useState(false);
    const[personalData,setPersonalData]=useState([{}]);
    const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  var fullName=firstName+' '+lastName;
    const countriesArray = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
      "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
      "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
      "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
      "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
      "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
      "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
      "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
      "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
      "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
      "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
      "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
      "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
      "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
      "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
      "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
      "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
      "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
      "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
      "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America",
      "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
  
    const [selectedCountry, setSelectedCountry] = useState('');
  
    const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
      handlePlaceholders(event.target.value, 'currentLocation');
    };
    const handleDiscard=()=>{
      if (inputDirty) {
        setDiscardpopup(true)
      }
      else{
        close()
      }
    }
    useEffect(()=>{
setPersonalData(personalInfo)
setSelectedCountry(personalInfo[0].currentLocation)
    },[personalInfo]);
    
    useEffect(() => {
      const slicer=()=>{for (let i = 0; i <personalInfo?.[0].fullName.length; i++) {
        if (personalInfo?.[0].fullName[i]===" " &&personalInfo?.[0].fullName.length>0) {
          setfirstName(personalInfo?.[0].fullName.slice(0,i))
           setlastName(personalInfo?.[0].fullName.slice(i+1))
        }
        
      }}
      
      
    slicer();
      
    }, [personalInfo?.[0]])
    const handleName=(value,property)=>{
      if(property==='firstName')
        setfirstName(value)
      else if(property==='lastName')
        setlastName(value)
      else
      return
    handlePlaceholders(fullName,"fullName")
    }
  return (
    <div>
    <div className={socialLinks?'personal_info_container personal_info_container_ghost':'personal_info_container'}>
        <div className="personal_info_top"> 
        <p className="title_personal_info">Personal informatoin</p>
        <FaTimes className='close_icon' onClick={handleDiscard}/>
        </div>
        <div className="personal_info_bottom">
        <ul>
        <li> First Name
          <input id="personal_info_input" placeholder={firstName} value={firstName} onChange={(e) => handleName(e.target.value,"firstName")}type="text" />
          
        </li>
        <li> Last Name
          <input id="personal_info_input" placeholder={lastName} value={lastName} onChange={(e) => handleName(e.target.value,"lastName")}type="text" />
        </li>
        <li>
        <div className='address'>
      <label htmlFor="countrySelect">Gender </label>
      <select 
      id="countrySelect" 
      value={personalData[0].gender} 
      onChange={(e) => handlePlaceholders(e.target.value,'gender')}>
        <option value="" disabled hidden>Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

    </div>
  
        </li>
        <li> Date of Birth
          <input id="personal_info_input" placeholder={personalInfo[0].dateOfBirth} value={personalData[0].dateOfBirth} onChange={(e) => handlePlaceholders(e.target.value,'dateOfBirth')}type="date" />
        </li>
        
        <li>
        <div className='address'>
      <label htmlFor="countrySelect">Address </label>
      <select 
      id="countrySelect" 
      value={selectedCountry} 
      onChange={handleCountryChange}>
        <option value="" disabled hidden>country</option>
        {countriesArray.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

    </div>
  
        </li>
        
        <li> User name
          <input id="personal_info_input" placeholder={personalInfo[0].username} value={personalData[0].username} onChange={(e) => handlePlaceholders(e.target.value,'username')}type="text" />
        </li>
        {personalInfo[0].role === 'Staff' &&
        (<li>Staff Role
          
            <input id="personal_info_input" onChange={(e) => handlePlaceholders(e.target.value,'staffRole')}type= 'text' value={personalData[0].staffRole} placeholder={personalInfo[0].staffRole}/>
            
          </li>)}
          <li onClick={()=>{setSocialLinks(true)} } className='edit_socail_links'>
            Edit Contact Info <FaPen /> 
          </li>
          <div className='personal_info_buttons'>
       <button disabled={loading} onClick={submitFile} className='submit_personal_info pI_btn'>{loading?'Submitting...':'Submit'}</button>
       <button onClick={handleDiscard} className='discard_personal_info pI_btn'> Discard</button>
       </div>
        </ul>
        
        </div>
    </div>
    {
      Discardpopup&&(
        <div className='personal_info_container warning'>
          <p>Are You Sure? All changes you have made will be lost</p>
          <div className='personal_info_buttons'>
       <button onClick={close} className='discard_personal_info pI_btn'> I'm Sure</button>
       <button onClick={()=>{setDiscardpopup(false)}} className='submit_personal_info pI_btn'>wait</button>
       </div>
        </div>
      )
    }
    {socialLinks&&
          (
            <ContactInfo
            close={()=>setSocialLinks(false)}
            personalInfo={personalData}
            display={true}
            edit={true}
            forsocials={forsocials}
            handlePlaceholders={handlePlaceholders}
            />
          )
        }
    </div>
  )
}

export default EditPersonalInfo