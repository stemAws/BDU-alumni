import { FaGitAlt, FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import "../styles/aboutDevs.css"
import { useState } from "react";
const AboutDevs = () => {
    const [devs, setdevs] = useState([{
        fullName:"Hailemichael Mulugeta",
        img:"",
        detail:"UI/UX Designer & Frontend Developer Hailemichael is a skilled UI/UX designer and frontend developer, specializing in translating design concepts into interactive and responsive web experiences. Hailemichael's commitment to quality and usability ensures that your website not only looks great but also performs flawlessly across devices and browsers.",
        socialLinks:{
            gitHub:"https://github.com/hailemichael-ayana",
            linkedin:"https://www.linkedin.com/in/hailemichael-ayana-182629249",
            telegram:"https://t.me/hailemichaelMulugeta"
        }
    },
    {
        fullName:"Yordanos Ayenew",
        img:"",
        detail:"UI/UX Designer & Frontend Developer Yordanos is a talented UI/UX designer and frontend developer with a passion for creating visually appealing and user-friendly interfaces. With a keen eye for design trends and a deep understanding of user behavior, she crafts intuitive and engaging user experiences that resonate with your target audience. Yordanos's proficiency in frontend technologies like HTML, CSS, and JavaScript ensures the seamless translation of design concepts into functional web interfaces.",
        socialLinks:{
            gitHub:"https://github.com/YordanosAyenew",
            linkedin:"",
            telegram:"https://t.me/Benyas_3"
        }
    },
    {
        fullName:"Abrham Abayneh",
        img:"",
        detail:"Backend Developer Abrham is a dedicated backend developer and hosting specialist with an experience in web development and system administration. Abrham's meticulous approach to coding and testing guarantees the reliability and security of your backend infrastructure.",
        socialLinks:{
            gitHub:"https://github.com/a-abrham",
            linkedin:"",
            telegram:"https://t.me/a_abrham"
        }
    },
    {
        fullName:"Netsanet Alemu",
        img:"",
        detail:"Fullstack Developer Netsanet is a fullstack developer specializing in building robust and scalable web applications. Netsanet's attention to detail and problem-solving skills ensure that your website is optimized for performance and efficiency.",
        socialLinks:{
            gitHub:"https://github.com/NetsanetAlemu",
            linkedin:"https://www.linkedin.com/in/netsanet-alemu-8a8855264",
            telegram:"https://t.me/medhin94"
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