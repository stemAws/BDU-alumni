import { useState, useEffect } from "react";
import { useParams,Link } from 'react-router-dom';
import user from '../../assets/images/photo_2024-02-25_15-58-46.jpg';
import Experiances from "../../component/Experiances";
import '../../styles/experiance.css'
import Educations from "../../component/Educations";
import Activities from "../../component/Activities";
import ContactInfo from "../../component/ContactInfo";

const ProfilePage = () => {
    const { username } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [educations,setEducations]=useState([])
  const [bgImageUrl, setBgImageUrl] = useState('');
  const [experiances,setExperiances]=useState([])
  const [personalInfo,setPersonalInfo]=useState([
  ])
  const[activities,setActivities]=useState([])
  const [showContact,setShowContact]=useState(false)
  useEffect(()=>{
    const getPosts =async()=>{
      const postsFromServer = await fetchPosts()
      setActivities(postsFromServer); 
    }
    const getPersonalInfo= async()=>{
      const personalInfoFromServer = await fetchPersonalInfo();
      setPersonalInfo(personalInfoFromServer)
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
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getProfilePicture/${username}`,{
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch profile picture URL: ${res.status} - ${res.statusText}`);
        }
        const url = await res.text();
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    };
  

    const fetchBGPicture = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getCoverPicture/${username}`,{
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch profile picture: ${res.status} - ${res.statusText}`);
        }
        const url = await res.text();
        setBgImageUrl(url);
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
  },[])
  const fetchPosts = async() =>{
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${username}`,{
      credentials: 'include',
    });
    const data= await res.json();
    return data;
    } catch (error) {
      console.error('Error during fetching posts:', error);
    }
    
  }
  const fetchExperiances = async () => {
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experiences/${username}`,{
      credentials: 'include',
    }) ;
    const data= await res.json();
    return data;
    } catch (error) {
      console.error('Error during fetching experiences:', error);
    }
    
  }

  const fetchEducations = async () => {
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education/${username}`,{
      credentials: 'include',
    }) ;
    const data= await res.json();
    return data;
    } catch (error) {
      console.error('Error during fetching educations:', error);
    }
    
  }
  const fetchPersonalInfo = async () => {
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni/${username}`,{
      credentials: 'include',
    }) ;
    const data= await res.json();
    return data;   
    } catch (error) {
      console.error('Error during fetching personal info:', error);
    }
    
  }
  const stillWorking=()=>{
    var workingPlace =""
    for (let i = 0; i < experiances?.length; i++) {
      if (experiances[i].stillWorking) {
        workingPlace= `${experiances[i].jobTitle} at ${experiances[i].companyName}`
      return workingPlace
      }
      else{
        return
      } 
    }
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
  return (
    <div className="User_profile_container">
      <div  className="upper_slide">
      {imageUrl?<img className="profile_img" src={imageUrl} alt="profile image" />:<img className="profile_img" src={user} alt="profile image"  />}
      {personalInfo?.length > 0 && (<p className="full_name">{personalInfo?.[0].fullName}</p>)}
       </div>
       {
        window.addEventListener('scroll',checkbox)
       }
    <section className="update_profile_fields">
    <section className="personal personal_onprofile">
    <div className="personal_post">
      <section className="personal_info onprofile">
        <div className={personalInfo?.[0]?.role==='Student'?"backgroundImageHolder":"backgroundImageHolder blue"}>{bgImageUrl?<img className="backgroundImage" src={bgImageUrl} alt="background image" />:<div className="backgroundImage default"  ></div>}
      </div>
        <div className={personalInfo?.[0]?.role==='Student'?"profileImageHolder toshow":"profileImageHolder toshow blue"} >{imageUrl?<img className="profileImage" src={imageUrl} alt="profile image" />:<img className="profileImage" src={user} alt="profile image" />}
        </div>
        <ul>
        {personalInfo?.length > 0 ? (
            <>
        <li> 
          <p className="full_name">{personalInfo?.[0]?.fullName}</p>
          {
            personalInfo?.[0]?.role==='Student'&&(
               <p> {personalInfo?.[0]?.graduationYear} Batch</p>
            )
          }
        </li>
        <li> 
          {experiances[0]&&<p className="work_place">{stillWorking()}
            </p>}
          <div className="learn_and_work"  >
          <div className="address_contact_info">{personalInfo?.[0]?.currentLocation} 
        <p className="contact_info" onClick={()=>setShowContact(true)} >Contact info</p>
        </div>
        {educations?.length > 0 &&
          <div className="learning_place">
            <p>{`${educations[educations.length - 1].degree} in ${educations[educations.length - 1].fieldOfStudy} at ${educations[educations.length - 1].institution}`}</p>
          </div>
        }
          </div>
        </li>
        </>
        ):'no personal info found'
}
        </ul>
    </section>
    {showContact&&(
      <ContactInfo 
      close={()=>setShowContact(false)}
      personalInfo={personalInfo}
      display={false}
      />
    )}
    <section className=" personal_info add_story onprofile">
  <header className="top">
    <h1>Posts</h1>
    </header>
        {activities?.length>0?
        <Activities
        activities={activities}
        personalInfo={personalInfo}
        imageUrl={imageUrl}
        />
        :'No posts yet'
    }
    {activities?.length>0 && <div className="see_all_posts">
         <Link to= {`/post/${username}`}>see all Posts</Link>
        </div>
}
   </section>
   <section className="experiance_and_education e_and_e_on_Profile">
    <section className="personal_info a exp">
       <h1>Experience</h1>
        {experiances?.length>0? 
        <Experiances 
        experiances={experiances} 
        ondisplay={false}
        />
        :"No Experiences to show"
        }
        
    </section>
    <section className="personal_info a">
    <h1>Educational Background</h1>
        {educations?.length>0? 
        <Educations 
        educations={educations} 
        ondisplay={false}
        />
        :"No Educational record to show"
        }
    </section>
    </section>
   </div>
    </section>
   
    </section>
    
    </div>
  )
}

export default ProfilePage
