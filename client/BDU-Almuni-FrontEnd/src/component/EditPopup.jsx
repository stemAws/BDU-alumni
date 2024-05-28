import { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa";
import "../styles/editpopup.css"
const EditPopup = ({activity,close,updatePost,loading}) => {
  const [description, setDescription] = useState('');
  const [isToggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!isToggled);
  };
    const onsubmit=async(e)=>{
        const id=activity[0]?.postID;
        e.preventDefault()
        try {
            await updatePost(isToggled, description,id);
            close()
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }
    useEffect(() => {
        if (activity[0]?.content) {
          setDescription(activity[0].content);
        }
        if (activity[0]?.suggestToAdmin){
          setToggled(activity[0].suggestToAdmin)
        }
      }, [activity]);
  return (
    <div className="overlay_edit_pop">
    <div className="edit_Popup">
        <FaTimes className="close_btn" onClick={()=>close()}/>
        <form onSubmit={onsubmit} >
            <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="text_sider"><p className='suggest'>{!isToggled ?"suggest Admin?":"suggested "}</p> 
          <div onClick={handleToggle} className={`slide-toggle-container OnEdit ${isToggled ? 'toggled' : ''}`}>
      <div className="slider" onClick={handleToggle}></div>
    </div></div>
          
          <input className="sendmessage" type="submit" value={loading?"Saving...":"Save Changes"} />
          </form>
          <div></div>
        </div>
        </div>
  )
}

export default EditPopup