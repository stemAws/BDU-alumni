import { useState } from 'react';
import "../styles/footer.css";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import logo from "../assets/images/logo.svg";
import Donation from './Donation';
import Confirmation from "./Confirmation";
const sections = [
  {
    title: 'Academics',
    links: [
      { text: 'Education', url: '#' },
      { text: 'Research', url: '#' },
      { text: 'Publications', url: '#' },
      { text: 'Departments', url: '#' }
    ]
  },
  {
    title: 'Community',
    links: [
      { text: 'Alumni Stories', url: '#' },
      { text: 'Events', url: '#' },
      { text: 'Networking', url: '#' },
      { text: 'Volunteer', url: '#' }
    ]
  },
  {
    title: 'Opportunities',
    links: [
      { text: 'Job Offers', url: '#' },
      { text: 'Internships', url: '#' },
      { text: 'Workshops', url: '#' },
      { text: 'Conferences', url: '#' }
    ]
  },
  {
    title: 'Media',
    links: [
      { text: 'Gallery', url: '#' },
      { text: 'Videos', url: '#' },
      { text: 'News', url: '#' },
      { text: 'Blog', url: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Donation', url: '/donations' },
      { text: 'Mentorship', url: '#' },
      { text: 'Scholarships', url: '#' },
      { text: 'Support Services', url: '#' }
    ]
  }
];
const FooterSection = ({ title, links  }) => (
  <div className="each">
    <h4>{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url}>{link.text}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const [emailSuccess, setemailSuccess] = useState(false)
  const [emailInput, setemailInput] = useState()
  const handleEmailSent=(e)=>{
    e.preventDefault()
    // try {
      // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/emailSub`)
    // } catch (error) {
      
    // }
    
    if (emailInput) {
      setemailSuccess(true)
      setemailInput('')
    }
      // setemailSuccess(true)
  }
  const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
  return (
    <>
      {location.pathname!==`/activateAccount/${token}`&&
        <footer className='footer___container'>
            <div className="footer___top">
              <h2>Join our newsletter to <br /> keep up to date with us!</h2>
              <form onSubmit={handleEmailSent} >
                <div className="subscribe">
                  <Person2OutlinedIcon />
                  <input 
                    onChange={(e)=>setemailInput(e.target.value)}  
                    value={emailInput}
                    type="email"
                    required
                    placeholder='Enter your email' />
                </div>
              <input className='submit-btn' type="submit" value="Subscribe" />
              </form>
              {emailSuccess&&
                <Confirmation close={()=>{setemailSuccess(false)}} text={'Thanks For Registering We Will Keep In Touch'} />
              }
            </div>
            <hr />
            <div className="footer___middle">
              <div className="middle___left">
                <img src={logo} alt="BDU Logo" />
                <h3 className='webname'>BDU Alumni Website</h3>
                <p>We are connecting Bahir Dar University Graduates</p>
              </div>
              <div className="middle___right">
                {sections.map((section, index) => (
                  <FooterSection  key={index} title={section.title} links={section.links} />
                ))}
              </div>
            </div>
            <hr />
            <div className="footer___bottom">
              <div className="bottom___left">
                <p>&copy; {new Date().getFullYear()} Bahir Dar University</p>
              </div>
              <div className="bottom___right">
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Cookies</a>
              </div>
            </div>
          </footer>}
    </>
    
  )
}

export default Footer;
