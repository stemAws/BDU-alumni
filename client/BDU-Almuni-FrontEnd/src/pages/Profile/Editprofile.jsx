import { useState, useEffect, useContext } from "react";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import user from '../../assets/images/photo_2024-02-25_15-58-46.jpg';
import Top from "../../component/Top";
import Experiances from "../../component/Experiances";
import '../../styles/experiance.css'
import AddExperiance from "../../component/AddExperiance";
import TopEdu from "../../component/TopEdu";
import AddEducation from "../../component/AddEduaction";
import Educations from "../../component/Educations";
import AddStoryPopup from '../../component/AddStoryPopup';
import Button from '../../component/Button';
import { BiCamera } from 'react-icons/bi';
import {FaPen} from 'react-icons/fa'
import Activities from "../../component/Activities";
import { Link ,useNavigate} from "react-router-dom";
import EditPersonalInfo from "../../component/EditPersonalInfo";
import Cookies from 'js-cookie';
// import SigninWrapper from "../../component/SigninWrapper";
// import { SigninContext } from '../../Pages/UsersPage'
const Editprofile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [bgImageUrl, setBgImageUrl] = useState('');
  const [inputDirty,setInputDirty]=useState(false);
  const [showAddExperiance,setshowAddExperiance]= useState(false)
  const [profilePicPopUp, setProfilePicPopUp] = useState(false);
  const [coverPicPopUp, setCoverPicPopUp] = useState(false);
  const[showEditpersonalinfoPopup,setshowEditpersonalinfoPopup]=useState('');
  const [experiance,setExperiance]=useState([])
  const[education,setEducation]=useState([])
  const[activities,setActivities]=useState([])
  const [placeholders,setPlaceholders]=useState([{
    fullName:'',
    gender:'',
    dateOfBirth:'',
    email:'',
    phoneNumber:'',
    currentLocation:'',
    additionalInfo:'',
    username:'',
    password:'',
    enrollmentYear:'',
    graduationYear:'',
    staffRole:'',
    hiredDate:'',
    leftDate:'',
    socialMediaHandles:['','',''],
  }])
  const [notauth, setnotauth] = useState(false)
  // const { isSigninOpen, setSigninOpen } = useContext(SigninContext);
  const [showEditExperiance,setshowEditExperiance]= useState(true)
  const [showAddEducation,setshowAddEducation]= useState(false)
  const[showEditEducation,setshowEditEducation]=useState(false)
  const [educations,setEducations]=useState([])
  const [experiances,setExperiances]=useState([])
  const [loading, setloading] = useState(false)
  const closeSignin =() =>{ 
    setSigninOpen(false);
    window.location.reload()
};
const forsocials=(value)=>{
  setPlaceholders((prevPlaceholders) => [
    {
      ...prevPlaceholders[0],
      socialMediaHandles: value,
    },
  ]);
}
const checkbox=()=>{
  const slide =document.querySelector('.upper_slide');
  const profile =document.querySelector(".personal_info.onprofile");
  if(profile){
  const bottom_profile = profile.getBoundingClientRect().bottom
  if(bottom_profile < 104.6 ){
    slide.classList.add('upper_slide_show')
  } 
  else if(bottom_profile >= 104.6)
  {
    slide.classList.remove("upper_slide_show")
  }
}

}
  useEffect(()=>{
    const getPosts =async()=>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${username}`,{
        credentials: 'include',
      });
      
      if (res.status===403) {
        setnotauth(true)
      }
      else if(res.ok){
      const postsFromServer= await res.json();
      setActivities(postsFromServer); 
      }
      else if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    }
    const getPersonalInfo= async()=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni/${username}`,{
          credentials: 'include',
        }) 
        
        if (res.status===403) {
          setnotauth(true);
        }
        else if(res.ok){
        const personalInfoFromServer= await res.json();
      setPlaceholders(personalInfoFromServer)
        }
        else if (!res.ok) {
          throw new Error(`Failed to fetch personal info: ${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    
      
    }
    const getExperiances = async () => {
      const experianceFromServer = await fetchExperiances()
      setExperiances(experianceFromServer)
    }
    const getEducation= async()=>{
      const educationFromServer = await fetchEducations();
      setEducations(educationFromServer)

    }
    const fetchProfilePictureUrl = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getProfilePicture/${token}`,{
          credentials: 'include',
        });
    
        
        if (res.status===403) {
          setnotauth(true);
        }
        else if(res.ok){
        const url = await res.text();
        setImageUrl(url);
        }
        else if (!res.ok) {
          throw new Error(`Failed to fetch profile picture URL: ${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    };
  

    const fetchBGPicture = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getCoverPicture/${token}`,{
          credentials: 'include',
        });
    
        
        if (res.status===403) {
          setnotauth(true);
        }
        else if(res.ok){
        const url = await res.text();
        setBgImageUrl(url);
        }
        else if (!res.ok) {
          throw new Error(`Failed to fetch profile picture: ${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        return null;
      }
    }
    fetchProfilePictureUrl();
    fetchBGPicture()
    getPersonalInfo();
    getExperiances();
    getEducation();
    getPosts();
    
  },[username])

 let workingPlace =""
  const stillWorking=()=>{
    for (let i = 0; i < experiances?.length; i++) {
      if (experiances[i].stillWorking) {
        workingPlace= `${experiances[i].position} at ${experiances[i].company}`
      return workingPlace
      }
      else{
        return
      }
      
    }
   
  }
  const fetchExperiances = async () => {
    try {
      const token = Cookies.get('id2')
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences/${token}`,{
        credentials: 'include',
      });
      if (res.status===403) {
        setnotauth(true);
      }
      else if(res.ok){
      const data = await res.json();
      setExperiances([...experiances,data])
      return data;
      }
      else if (!res.ok) {
        throw new Error(`Failed to fetch experiences. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error during fetching experiences:", error);
      return null;
    }
  window.location.reload()
  };
  
  const fetchEducations = async () => {
    try {
      const token = Cookies.get('id2')
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education/${token}`,{
        credentials: 'include',
      });
      
      if (res.status===403) {
        setnotauth(true);
      }
      else if(res.ok){
      const data = await res.json();
      return data;
      }
      else if (!res.ok) {
        throw new Error(`Failed to fetch education data. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching education data:", error);
      return [];
    }
  }
  const addExperiance = async ({ token, jobTitle,industry, employmentType, companyName, startDate, endDate, stillWorking }) => {
    try {
      const cookies = document.cookie;
    const match = cookies.match(/id=([^;]*)/);
    const token = match ? match[1] : null;
      setloading(true)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
      alumniId: token,
      position:jobTitle,
      industry,
      employmentType,
      company:companyName,
      startDate,
      endDate,
      stillWorking:stillWorking===true?1:0,
    }),
    }) ;
    if (res.status===403) {
      setnotauth(true);
    }
    else if(res.ok){
    const data = await res.json()
    setExperiances([...experiances,data])
    window.location.reload()
    }
    } catch (error) {
      console.error('Error during adding experience:', error);
      setloading(false)
    }
    
  }
  const deleteExperiance = async (id)=>{
    try {
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences/${id}`,{
    method:'DELETE',
    headers:{
      'Content-type':'application/json',
    },
    credentials: 'include',
    }) ;
    if (res.status===403) {
      setnotauth(true);
    }
    else if(res.ok){
    setExperiances(experiances.filter((experiance)=>experiance.id!==id))
    window.location.reload()
    }
    } catch (error) {
      console.error(`Error during deleting experience with ID ${id}:`, error);
    }
    
  }
  const getExperienceById = async(id)=>{
      const desiredExperience = experiances.find(exp => exp.experienceId === id);
      setExperiance([desiredExperience])
      
  }
  const updateExperiance = async (jobTitle,industry,employmentType,companyName,startDate,endDate,stillWorking,id) => {
    try {
      setloading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                position: jobTitle,
                industry:industry,
                employmentType:employmentType,
                company:companyName,
                startDate: startDate,
                endDate: endDate,
                stillWorking: stillWorking,
                experienceId:id,
            }),
        });

      
        if (response.status===403) {
          setnotauth(true);
        }

        // const Data = await response.json();
        else if(response.ok){
        setshowAddExperiance(false);
        window.location.reload();
        }  
        else if (!response.ok) {
            setloading(false)
            return response.status(500).json({ error: "Couldn't update the data" });
            
        }
    } catch (error) {
      setloading(false)
        console.error('Error updating experience:', error);
    }
};
const getEducationById = async(id)=>{
  const desiredEducation = educations.find(edu => edu.educationId === id);
  setEducation([desiredEducation])
}
const updateEducation = async (institution,degree,admission,major,minor,graduatingYear,id)=>{
  try {
    setloading(true)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          educationID:id,
          institution:institution,
          degree:degree,
          admission:admission,
          major:major,
          minor:minor,
          graduatingYear:graduatingYear,
        }),
    });

    
    if (response.status===403) {
      setnotauth(true);
    }

    // const Data = await response.json();
    else if(response.ok){
    setshowAddEducation(false);
    window.location.reload();
    }
    else if (!response.ok) {
      setloading(false)
        return response.status(500).json({ error: "Couldn't update the data" });
    }
} catch (error) {
  setloading(false)
    console.error('Error updating experience:', error);
}

}
  
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup); 
  };


  const addEducation = async ({token,institution,degree,admission,major,minor,graduatingYear}) => {
    try {
      setloading(true)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
      personId:token,
      institution,
      degree,
      admission,
      major,
      minor,
      graduatingYear,
    }),
    }) ;
    if (res.status===403) {
      setnotauth(true);
    }
    else if(res.ok){
    const data = await res.json()
    setEducations([...educations,data])
    window.location.reload()
    }
    else if(!res.ok){
      return res.status(500).json({ error: "Couldn't update the data" });
    }
    } catch (error) {
      console.error('Error during adding education:', error);
      setloading(false)
    }
    
  }
  const deleteEducation = async (id)=>{
try {
  const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/education/${id}`,{
    method:'DELETE',
    headers:{
      'Content-type':'application/json',
    },
    credentials: 'include',
    }) ;
    if (res.status===403) {
      setnotauth(true);
    }
    else if(res.ok){
    setEducations(educations.filter((education)=>education.id!==id))
    window.location.reload()
    }

} catch (error) {
  console.error('Error during deleting education:', error);
}
    
  }
  const editExperiance= ()=>{
    setshowAddExperiance(!showAddExperiance)
      setshowEditExperiance(true)
      
  }
  const editEducation= ()=>{
    setshowAddEducation(!showAddEducation)
      setshowEditEducation(true)
      
  }
  const addStory=async({imageFile,description,isToggled})=>{
    var suggest=0; 
    if (isToggled===true) {
      suggest=1;
      
    }
    else{
      suggest=0
    }
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('content', description);
    formData.append('suggestToAdmin', suggest);

    try {
      setloading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (response.status===403) {
        setnotauth(true);
      }
     else if(response.ok){
      const data = await response.json();
    setActivities(...activities,data)
    window.location.reload()
     }
      
    } catch (error) {
      console.error('Error adding story:', error);
      setloading(false)
    }
    
}

const deleteStory = async (id)=>{
  try {
   const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences/${id}`,{
      method:'DELETE',
      credentials: 'include',
      headers:{
        'Content-type':'application/json',
  },
  }) ;
  if (response.status===403) {
    setnotauth(true);
  }
  else if(response.ok){
  setActivities(activities.filter((activity)=>activity.id!==id))
  window.location.reload()}
  } catch (error) {
    console.error('Error during deleting story:', error);
  }
  
}
const getStoryById = async(id)=>{
    const desiredPost = activities.find(activity => activity.postID === id);
    setActivities([desiredPost])
    
    
}
  const submitFile= async () => {

    // const cookies = document.cookie;
    // const match = cookies.match(/id=([^;]*)/);
    // const token = match ? match[1] : null;
  try {
    setloading(true)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-email`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: placeholders[0].email,
      }),
    });
    const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-username`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: placeholders[0].username,
      }),
    });
    const responseEmail = await response.json(); 
    const responseusername = await response2.json()
    if (responseusername.isUsernameTaken) {
      toast.error('Username Taken')
      setloading(false)
    } 
    else if(responseEmail.isEmailTaken){
      toast.error('There is already an account with that Email')
      setloading(false)
    }
    else {
            try {
              const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                  'Content-type': 'application/json', 
                },
                body: JSON.stringify({
                fullName: placeholders[0].fullName,
                gender: placeholders[0].gender,
                dateOfBirth: placeholders[0].dateOfBirth,
                email: placeholders[0].email,
                phoneNumber: placeholders[0].phoneNumber,
                currentLocation: placeholders[0].currentLocation,
                bio: placeholders[0].additionalInfo,
                username: placeholders[0].username,
                enrollmentYear: placeholders[0].enrollmentYear,
                graduationYear: placeholders[0].graduationYear,
                socialMediaHandles:placeholders[0].socialMediaHandles,  
              }),
              }) ;
                
              if (res.status===403) {
                setnotauth(true);
              }
              else if(res.ok){
              const data = await res.json();
              setPlaceholders([...placeholders, data]);
              navigate(`/Editprofile/${placeholders[0].username}`);
              window.location.reload();
              }
              else if (!res.ok) {
                setloading(false)
                return res.status(500).json({ error: "Couldn't update the data" });
              }    
            } catch (error) {
              setloading(false)
              console.error('Error updating alumni profile:', error);
            }
    
  };
} catch (error) {
  setloading(false)
  console.error('Error during alumni creation:', error);
}
  }
  
 

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setProfilePicPopUp(true);
      
    };

    const [fileCover, setFileCover] = useState(null);
    const handleFileChangeCover = (e) => {
      const selectedFile = e.target.files[0];
      setFileCover(selectedFile);
      setCoverPicPopUp(true);
      
    };
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    try {
       setloading(true)
      const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadProfilePicture`, {
        method: 'POST',
        credentials: 'include',
      
        body: formData,
      });
      if (res.status===403) {
        setnotauth(true);
      }
      // const result = await response.json();
      else if(res.ok){
      setProfilePicPopUp(false);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setloading(false)
    }
  
    window.location.reload();
  };
  const handleUploadCover = async () => {
    const formData = new FormData();
    formData.append('coverPicture', fileCover);
  
    try {
      setloading(true)
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadCoverPicture`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (res.status===403) {
        setnotauth(true);
      }
      // const result = await response.json();
      else if(res.ok){
      setProfilePicPopUp(false);
      }
    } catch (error) {
      console.error('Error uploading background picture:', error);
      setloading(false)
    }
  
    window.location.reload();
  };
  
  const handleDiscard = () => {
    setFile(null);
    setProfilePicPopUp(false);
  };
  const handleDiscardCover = () => {
    setFileCover(null);
    setCoverPicPopUp(false);
  };
  const handlePlaceholders = (value, property) => {
    setPlaceholders((prevPlaceholders) => {
      const updatedPlaceholders = [...prevPlaceholders];
      updatedPlaceholders[0][property] = value;
      return updatedPlaceholders;
      
    });
    setInputDirty(true)
  };
  
  return (
    <div className="User_profile_container">
      <div  className="upper_slide">
      <img className="profile_img" src={imageUrl} alt="profile image" />
      {placeholders?.length > 0 && (<p className="full_name">{placeholders[0].fullName}</p>)}
       </div>
       {
        window.addEventListener('scroll',checkbox)
       }
      <ToastContainer  autoClose={1500}/>
      <section className="update_profile_fields">
      <section className="personal personal_onprofile">
      <div className="personal_post">
      <section className="personal_info onprofile bgc_overlay">
      <div className="backgroundImageHolder"><img className={placeholders?.[0]?.role==='Student'?"backgroundImage":"backgroundImage blue"} src={bgImageUrl} alt="background" />
      </div>
      <div className="backcamera" >
      <label htmlFor="file_Input">
        <BiCamera size={90} className="camera" />
      </label>
      <input style={{width:'0',height:0}} accept="image/*" type="file" id="file_Input" onChange={handleFileChangeCover} />
    </div>
      {coverPicPopUp && (
        <div className="uploaded_overlay_cover">
          <div>
          <div className="uploaded_bg_img">
            <img src={URL.createObjectURL(fileCover)} alt="Selected" /> 
            <div className="button" >
            <Button 
            disabled={loading}
            text={loading?'uploading...':'upload'}
            onClick={handleUploadCover}/>
            <Button id="discard" text='discard'onClick={handleDiscardCover}/>
            </div>
            
          </div>
          </div>
        </div>
      )}
      <div className="profileImageHolder toshow"><img className={placeholders?.[0]?.role==='Student'?"profileImage":'profileImage blue'} src={imageUrl} alt="profile" />
      <div className="name_edit">
    </div>
      
      </div>
      <div className="input_file">
      <label htmlFor="fileInput">
        <BiCamera size={90} className="camera" />
      </label>
      <input accept="image/*" type="file" id="fileInput" onChange={handleFileChange} />
    </div>
    {profilePicPopUp && (
        <div className="upploaded_overlay">
          <div>
          <div className="uploaded_img">
            <img src={URL.createObjectURL(file)} alt="Selected" /> 
            <div className="button" >
            <Button 
            disabled={loading}
            text={loading?'uploading...':'upload'}
            onClick={handleUpload}/>
            <Button id="discard" text='discard'onClick={handleDiscard}/>
            </div>
            
          </div>
          </div>
        </div>
      )}
        <ul>
        {placeholders?.length > 0 ? (
            <>
        <li className="name_edit"> 
          <p className="full_name">{placeholders?.[0]?.fullName}</p>
          <div className='edit_save_icon' 
          >
                {
                  showEditpersonalinfoPopup ?
               '':<FaPen  onClick={()=>setshowEditpersonalinfoPopup(true)}/>
                }
            </div>
            
        </li>
        <p> {placeholders?.[0]?.batch} Batch</p>
        <li> 
          {experiances&&<p className="work_place">{stillWorking()}
            </p>}
          <div className="learn_and_work"  >
          <div className="address_contact_info">
            <p>{placeholders?.[0]?.currentLocation} </p>
        </div>
        {educations?.length > 0 &&
          <div className="learning_place">
            <p>{`${educations[educations?.length - 1]?.degree} in ${educations[educations?.length - 1]?.major} at ${educations[educations?.length - 1]?.institution}`}</p>
          </div>
        }
          </div>
        </li>
        </>
        ):'no personal info found'
}
        </ul>
    </section>
    {
      showEditpersonalinfoPopup&&(
        <div className="overlay_pop">
        <EditPersonalInfo 
        loadding={loading}
        forsocials={forsocials}
        close={()=>setshowEditpersonalinfoPopup(false)}
      personalInfo={placeholders}
      submitFile={()=>submitFile()}
      display={true}
      handlePlaceholders={handlePlaceholders}
      inputDirty={inputDirty}
      />
      </div>
      )
    }
  <section className=" personal_info add_story onprofile">
  <header className="top">
    <h1>Posts</h1>
    <Button onClick={togglePopup} text = 'Add Story' />
    
    </header>
    {showPopup && 
    <AddStoryPopup 
    loadding={loading}
    onAddStory={addStory} 
    handleClose={togglePopup} 
    />}
        {activities?.length>0?
        <Activities 
        activities={activities}
        onDelete={deleteStory}
        ondisplay={true}
        onEdit={true}
        personalInfo={placeholders}
        />
        :'No posts yet'
    }
    {activities?.length>0 && <div className="see_all_posts">
    <Link to={`/post/${username}?source=edit`}>See all Posts</Link>
        </div>
}
   </section>
      <section className="experiance_and_education e_and_e_on_Profile">
      <section className="personal_info a">
       <Top 
       onAdd={()=> {setshowAddExperiance(!showAddExperiance)
        setshowEditExperiance(false)}}
       showAddExperiance={showAddExperiance}
       />
       {showAddExperiance && <AddExperiance loading={loading} updateExperiance={updateExperiance} showEditExperiance={showEditExperiance} experiances={experiance} onAdd={addExperiance} showAddExperiance={setshowAddExperiance}/>}
        {experiances?.length>0? 
        <Experiances 
        experiances={experiances} 
        onDelete={deleteExperiance}
        onEdit={getExperienceById}
        ondisplay={true}
        onclose={editExperiance}
        />
        :"No Experiences to show"
        }
       
    </section>
    <section className="personal_info a">
       <TopEdu 
       onAddEdu={()=> {setshowAddEducation(!showAddEducation)
        setshowEditEducation(false)
      }}
       showAddEducation={showAddEducation}
       />
       {showAddEducation && <AddEducation loadding=
       {loading} updateEducation={updateEducation} showEditEducation={showEditEducation} educations={education}onAddEdu={addEducation} showAddEducation={setshowAddEducation}/>}
        {educations?.length>0? 
        <Educations 
        educations={educations} 
        onDelete={deleteEducation}
        onEdit={getEducationById}
        ondisplay={true}
        onclose={editEducation}
        />
        :"No Educational record to show"
        }
    </section>
    </section>
    </div>
    </section>
    </section>
    {/* {notauth&&<SigninWrapper setSigninOpen={setSigninOpen} isSigninOpen={isSigninOpen} closeSignin={closeSignin} />} */}
    </div>
  )
}

export default Editprofile
