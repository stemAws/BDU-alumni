import { useEffect, useState } from "react";
import "../styles/storiesDetail.css";
import {Link, useParams} from "react-router-dom"
const StoriesDetail = () => {
    const {id} = useParams()
    const [stories, setstories] = useState()
      const [singleStory, setsingleStory] = useState([{}])
      useEffect(() => {
        const fetchEvents=async()=>{
          try {
            const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/addedPosts`,{
                credentials: 'include',
              })
              const featuredStoriesFromServer= await res.json()
              if (!res.ok) {
                console.error("couldn't fetch the stories")
              }
              else{
                setstories(featuredStoriesFromServer)
          }} catch (error) {
            console.error("couldn't fetch the stories",error)
            
          }
        }
        fetchEvents();
      }, [])
      useEffect(() => {
        const filterStoriesWithId=()=>{
         setsingleStory(stories?.find(story => story.postId==id));
         }
         filterStoriesWithId()
      }, [stories])
      
  return (
    <div className={`stories-detail-container ${!singleStory?.mediaPath&& "no-img"}`}>
        {singleStory?.mediaPath&&<div className="stories-detal-left">
        {singleStory?.mediaPath&& 
        <>
         <div className="profile">
                <img className ="profile-pic" src={singleStory?.profilePicture} alt="" />
                <p className="full-name">{singleStory?.fullName}</p>
            </div>
            <img src={singleStory?.mediaPath} alt="" className="story-img" />
            <p className="story-date"> {new Date(singleStory?.createdAt).toLocaleString('default',{
              day:'numeric',
              month:'long',
              year:'numeric'
            })}</p>
             </>
            }
        </div>}
            <div className="stories-detal-right">
            {!singleStory?.mediaPath&&  <div className="profile">
                <img className ="profile-pic" src={singleStory?.profilePicture} alt="" />
                <p className="full-name">{singleStory?.fullName}</p>
            </div>}
                <p className="stories-detal-description">
                {
                  singleStory?.content
                }
                </p>
                {!singleStory?.mediaPath&&
                 <p className="story-date no-img-date"> {new Date(singleStory?.createdAt)?.toLocaleString('default',{
                  day:'numeric',
                  month:'long',
                  year:'numeric'
                  
                  })}</p>}
            </div>
        </div>
  )
}

export default StoriesDetail