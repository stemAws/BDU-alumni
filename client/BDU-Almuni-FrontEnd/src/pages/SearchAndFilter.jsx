import { useEffect, useState } from "react"
import { FaAngleDoubleDown, FaAngleDoubleUp, FaAtom, FaCalendarAlt, FaCaretDown, FaCaretLeft, FaIndustry, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaQuestionCircle, FaSlidersH } from "react-icons/fa"
import { useParams } from 'react-router-dom';
import MultipleProfiles from "../component/MultipleProfiles"
import profile from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import "../styles/searchAndFilter.css"
const SearchAndFilter = () => {
    const {name} =useParams();
    const [searchBy, setsearchBy] = useState("name")
    const [adjustingInputs,setadjustingInputs]=useState({
        graduatingYear:false,
        location:false,
        industry:false,
        department:false
    }
    )
    const [input, setinput] = useState("")
const [profiles, setprofiles] = useState()
const handleEachoption=(value)=>{
        setsearchBy(value)
        setadjustingInputs((prevState) => ({
            [value]: !prevState[value]
          }));
}

useEffect(() => {
  const fetchData =async()=>{
    try {
          
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni-directory`,{
          credentials:'include',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
        },
          body: JSON.stringify({
            searchByValue:input?input:name,
            searchBy:searchBy
        }),
        });

          if (response.ok) {
          const json = await response.json();
          setprofiles(json);
          }  
      } catch (error) {
          console.error('Error during fetching alumni data:', error);
      }
  }

 fetchData();
}, [name,input])

  return (
    <div className=" seachAndFilter-container">
        <div className="left-side">
            <div className="filter-top">
                <div>
                <FaSlidersH />
                <p>Filter</p>
                </div>
            </div>
            <div className="filter-bottom">
                <div  className="filter-option">
                <div onClick={()=>handleEachoption("graduatingYear")} className="iconsAndOptions">
                    <div>
                    <FaCalendarAlt/>
                    <p>Graduation Year</p>
                    </div>
                    {adjustingInputs.graduatingYear?<FaAngleDoubleUp size={10}/>:<FaAngleDoubleDown size={10} />}
                    </div>
                    {
                        adjustingInputs.graduatingYear&&
                        <input onChange={(e)=>setinput(e.target.value)} className="dropDown-input" type="number" />
                    }
                    
                </div>
                <div  className="filter-option">
                <div onClick={()=>handleEachoption("location")} className="iconsAndOptions">
                    <div>
                    <FaMapMarkerAlt/>
                    <p>Location</p>
                    </div>
                    {adjustingInputs.location?<FaAngleDoubleUp size={10}/>:<FaAngleDoubleDown size={10} />}
                    </div>
                    {
                        adjustingInputs.location&&<input onChange={(e)=>setinput(e.target.value)} className="dropDown-input" type="text" />
                    }
                </div>
                <div  className="filter-option">
                <div onClick={()=>handleEachoption("industry")} className="iconsAndOptions">
                    <div>
                    <FaIndustry/>
                    <p>Industry</p>
                    </div>
                    {adjustingInputs.industry?<FaAngleDoubleUp size={10}/>:<FaAngleDoubleDown size={10} />}
                    </div>
                    {
                        adjustingInputs.industry&&<input onChange={(e)=>setinput(e.target.value)} className="dropDown-input" type="text" />
                    }
                </div>
                <div className="filter-option">
                    <div onClick={()=>handleEachoption("department")} className="iconsAndOptions">
                    <div>
                    <FaAtom/>
                    <p>Department</p>
                    </div>
                    {adjustingInputs.department?<FaAngleDoubleUp size={10}/>:<FaAngleDoubleDown size={10} />}
                    </div>
                    
                    
                    {
                        adjustingInputs.department&&<input onChange={(e)=>setinput(e.target.value)} className="dropDown-input" type="text" />
                    }
                </div>
            </div>
        </div>
        <div className="right-side">
            {/* <div className="setted-filters">
            {searchBy==='location'&&<FaMapMarkerAlt/>}<p>{input}</p>
            </div> */}
        {profiles?.length !=0?<>
            <MultipleProfiles
            profiles={profiles}
            />
            </>:
            <p style={{margin:"200px 250px"}}> <FaQuestionCircle/> No User Found With Name {name}</p>}
            
        </div>
    </div>
  )
}

export default SearchAndFilter