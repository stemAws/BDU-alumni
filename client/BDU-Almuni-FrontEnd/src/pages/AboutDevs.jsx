import { FaGitAlt, FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import "../styles/aboutDevs.css"
import { useState } from "react";
const AboutDevs = () => {
    const [devs, setdevs] = useState([{
        fullName:"Kebede Chebude",
        img:"",
        detail:"lorLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel itaque laudantium, id dolorum velit animi nihil, error alias dolores et veritatis nostrum. Tempore ipsa possimus obcaecati totam harum quisquam reprehenderit.",
        socialLinks:{
            gitHub:"",
            linkedin:"",
            telegram:""
        }
    },
    {
        fullName:"Kebede Chebude",
        img:"",
        detail:"lorLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel itaque laudantium, id dolorum velit animi nihil, error alias dolores et veritatis nostrum. Tempore ipsa possimus obcaecati totam harum quisquam reprehenderit.",
        socialLinks:{
            gitHub:"",
            linkedin:"",
            telegram:""
        }
    },
    {
        fullName:"Kebede Chebude",
        img:"",
        detail:"lorLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel itaque laudantium, id dolorum velit animi nihil, error alias dolores et veritatis nostrum. Tempore ipsa possimus obcaecati totam harum quisquam reprehenderit.",
        socialLinks:{
            gitHub:"",
            linkedin:"",
            telegram:""
        }
    },
    {
        fullName:"Kebede Chebude",
        img:"",
        detail:"lorLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel itaque laudantium, id dolorum velit animi nihil, error alias dolores et veritatis nostrum. Tempore ipsa possimus obcaecati totam harum quisquam reprehenderit.",
        socialLinks:{
            gitHub:"",
            linkedin:"",
            telegram:""
        }
    },
])
  return (
    <div className="about-dev-container">
        <div className="about-dev-inside">
        {
            devs.map((dev)=>{
                
                return(
                
                    <div className="each-dev">
                    <div className="img-overlay">
                        <img src={dev.img} alt="" srcset="" />
                    </div>
                <div className="description">
                    <p className="devName">
                        {dev.fullName}
                    </p>
                    <p className="devDetail">
                        {dev.detail}
                    </p>
                    <div className="social-icons">
                        <a href={dev.socialLinks.gitHub}><FaGithub/></a> 
                        <a href={dev.socialLinks.linkedin}><FaLinkedinIn/></a>
                        <a href={dev.socialLinks.telegram}><FaTelegramPlane/></a>
                    </div>
                </div>
                </div>
                
                
                    )
            })
        }
        
       </div>
    </div>
  )
}

export default AboutDevs