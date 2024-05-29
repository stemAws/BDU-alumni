import '../styles/Posts.css'
import {  FaTrash, FaPen,FaLinkedinIn, FaLink, FaTelegramPlane, FaFacebookF  } from 'react-icons/fa';
import { useState,useEffect, useContext } from 'react';
import user from '../assets/images/photo_2024-02-25_15-47-18.jpg';
import { useParams, useLocation } from 'react-router-dom';
import EditPopup from '../component/EditPopup';
import DeleteConfirmation from '../component/DeleteConfirmation'
const Posts = (props) => {
  const { username } = useParams();
  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');
    // const [show, setShow] = useState(false);
    const [notauth, setnotauth] = useState(false)
    // const { isSigninOpen, setSigninOpen } = useContext(SigninContext);
    const [userDetails, setUserDetails] = useState({});
    const[activities,setActivities]=useState([])
    const [imageUrl, setImageUrl] = useState('');
    const[BgImageUrl,setBgImageUrl] =useState('');
    const[editPopup,setEditPopup] = useState(false);
    const[activity,setActivity]=useState()
    const[socialValues,setSocialValues]=useState(['','',''])
    const [deletePopup,setDeletePopup] =useState(false)
    const [clickedPostID, setClickedPostID] = useState(null);
    const [loading, setloading] = useState(false)
    const closeSignin =() =>{ 
      // setSigninOpen(false);
      window.location.reload()
  };
    useEffect(() => {
        const getPosts =async()=>{
          const postsFromServer = await fetchPosts()
          setActivities(postsFromServer); 
        }
        const fetchUserDetails = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni/${username}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
               
              }, 
              credentials: 'include',
            });
    
            if (response.ok) {
              const data = await response.json();
    
              setUserDetails(data[0]); 
            } 
            else if (response.status===403) {
              setnotauth(true)
            }
          } catch (error) {
            console.log('Error fetching user details');
          }
        };
        const fetchProfilePictureUrl = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getProfilePicture/${username}`,{
              credentials: 'include'
            });
            if (res.ok) {
              const url = await res.text();
              setImageUrl(url);
            }
            else if (res.status===403) {
              setnotauth(true)
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
           
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getCoverPicture/${username}`,{
              credentials: 'include',
            });
            if (res.ok) {
              const url = await res.text();
                setBgImageUrl(url);
            }
            else if (res.status===403) {
              setnotauth(true)
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
          getPosts();
           fetchUserDetails();
      }, [userDetails]); 
  useEffect(()=>{
    const settingSocialfromDatabase=()=>{
      if (userDetails.socialMediaHandles) {
        const SocialfromDatabase = userDetails.socialMediaHandles;
      setSocialValues(SocialfromDatabase)
      }
  }
    settingSocialfromDatabase()
  },[userDetails])
    const fetchPosts = async() =>{
      try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${username}`,{
        credentials: 'include',
      }) ;
      if (res.ok) {
        const data= await res.json();
      return data;
      }
      else if (res.status===403) {
        setnotauth(true)
      }
      
      } catch (error) {
        console.error('Error during fetching posts:', error);
      }
      
    }
    const handleDate=(activity,value)=>{
      const date = new Date(activity.createdAt);
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
        if (value==='date') {
          return formattedDate;
        }
        else if(value==='time') {
          return formattedTime;
        }
    
    
   
    
  }
    const handleSeeMore = (index) => {
      const seeMore = document.querySelector(`.see_More.S${index}`);
      const seeLess = document.querySelector(`.see_Less.SL${index}`);
      const postText= document.querySelector(`.post_text.txt${index}`)

      if (seeMore.style.display === 'none') {
        seeMore.style.display = 'inline';
        seeLess.style.display = 'none';
        postText?.classList.remove('post_text_full')
      } else {
        seeMore.style.display = 'none';
        seeLess.style.display = 'inline';
        postText.classList.add('post_text_full')
      }
    };

      const deleteStory = async (id)=>{
        try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,{
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'Authorization': `${localStorage.getItem('STEM')}`,
        },
        credentials: 'include',
        }) ;
        if (res.ok) {
          setActivities(activities.filter((activity)=>activity.id!==id))
        window.location.reload()
        }
        else if (res.status===403) {
          setnotauth(true)
        }
        
        } catch (error) {
          console.error('Error deleting post:', error);
        }
        
      }
      const getStoryById = async(id)=>{
        setEditPopup(true)
          const desiredPost = activities.find(activity => activity.postID === id);
          setActivity([desiredPost])
      }
      const updatePost = async (isToggled, description, id) => {
       
        try {
          setloading(true)
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
            method: 'PUT',
                headers: {
                  'Content-type': 'application/json', 
                  'Authorization': `${localStorage.getItem('STEM')}`,
                },
                credentials: 'include',
            body: JSON.stringify({
              content:description,
              suggestToAdmin:isToggled,
            }),
          });
           if (response.status===403) {
            setnotauth(true)
          }
         else if (!response.ok) {
            setloading(false)
            return response.status(500).json({ error: "Couldn't update the data" });
          }
        } catch (error) {
          setloading(false)
          console.error('Error updating post:', error);
        }
      };
      
  return (
    <div className='Posts'>
        <div className="profile_container">
            <div className="background">
            <img src={BgImageUrl} alt="profile image" />
            </div>
            <div className="profilepic">
              <img src={imageUrl} alt="profile image" />
            </div>
            {userDetails && (
            <div className='userdetail'>
              <p>{userDetails.fullName} </p>
            </div>
          )}
          {socialValues[0] && (
            <div className="socialmedia">
              {socialValues.map((value, index) => (
                <a key={index} href={`http://${value}`} target="_blank" rel="noopener noreferrer">
                    {value.includes('facebook') ? (
                      <FaFacebookF className='each_icons'/>
                    ) : value.includes('t.me') ? (
                      <FaTelegramPlane className='each_icons'/>
                    ) : value.includes('linkedin') ? (
                      <FaLinkedinIn className='each_icons'/>
                    ) : (
                      <FaLink className='each_icons'/>
                    )}
                </a>
              ))
                    }
              </div>
            )}

        </div>
        <div className='all_posts_container'>
            <h4>All Posts</h4>
            {activities?.length > 0 ? (
  activities.slice().reverse().map((activity, index) => (
            <div id={`p${activity.postID}`} className='post_container' key={index}>
                <section className='post_header'>
                <div className="profileDetail">
                    <div className="date_proflepic">{imageUrl?<img className ="profile_img"src={imageUrl} alt="profile image" />:<img className ="profile_img" src={user} alt="profile image" />}
                    {userDetails && (<p className=" profile_name">{userDetails.fullName} </p>)}
                </div><p className="date" >posted in <span>{handleDate(activity,'date')}</span></p>
               {source==='edit'&& 
                <div className="icons">
                {!activity?.suggestedByAdmin?(<FaPen onClick={()=>
                                      { getStoryById(activity?.postID)
                                        setEditPopup(true)}
                                        } className='pen_edit'
                      />):(<p className='featured'>Featured</p>)
                    }
                <FaTrash onClick={() => {
                  setClickedPostID(activity?.postID);
                  setDeletePopup(true);
                }} className='trash_delete'/>
              
                    
                </div>
}
            </div>
            <div className={`post_text txt${index}`}>{activity.content}</div>
                   {activity?.content?.length>=275&&(<>
                   <p onClick={()=>handleSeeMore(index)} className={`see_More S${index}`}>see more</p>
                   <p onClick={()=>handleSeeMore(index)} className={`see_Less SL${index}`}>see less</p>
                   </>)}
                   
                    </section>
                    {activity.mediaPath&&<img className="posted_pic" src={`${activity.mediaPath}`} alt="image" />}
                    <section className='time' >
                    {handleDate(activity,'time')}
                    </section>
                    <section className='date_time' >
                    <p className="date" > {handleDate(activity,'date')} at {handleDate(activity,'time')}</p>
                    
                    </section>
                    
                    {
              deletePopup&&(
                <DeleteConfirmation onDelete={() => clickedPostID && deleteStory(clickedPostID)} text='post' close={() => setDeletePopup(false)} />
              )
            }
            </div>
 ))
 ) : ''}
        </div>
        
        {editPopup&&
        <EditPopup 
        activity={activity}
        close={()=>setEditPopup(false)}
        updatePost={updatePost}
        loading={loading}
        />
        
        }
        {/* {notauth&&<SigninWrapper setSigninOpen={setSigninOpen} isSigninOpen={isSigninOpen} closeSignin={closeSignin} />} */}
    </div>
  )
}

export default Posts