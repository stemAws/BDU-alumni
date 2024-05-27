
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Activity = ({personalInfo,activity,onEdit}) => {
  const date = new Date(activity.createdAt);
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <Link to={`/post/${personalInfo?.[0]?.username}${onEdit ? '?source=edit' : ''}#p${activity.postID}`}><div className='task activity'>
      <div className="name_date">
        {personalInfo? (
          <p className="full_name">{personalInfo?.[0]?.fullName} </p>):''}
          <p className="Uploaded_date">Posted this  in {formattedDate} at {formattedTime}</p> </div>
          
          <div className="image_content">{activity.image && <div className="postimg"><img  src={`${activity.image}`} alt="" /></div>}
           <h3 className="content_image">
            {activity.content} 
          </h3> </div>
          
                                           
      </div></Link>
  )
}

export default Activity