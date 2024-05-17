import '../styles/newsAndUpdates.css'
import newsimg from '../assets/images/photo_2024-02-25_23-41-53.jpg'
import newsSmallImg from '../assets/images/photo_2024-02-25_23-38-22.jpg'
import newsSmallImg2 from '../assets/images/photo_2024-02-27_14-20-33.jpg'
import newsSmallImg3 from '../assets/images/photo_2024-02-25_16-12-11.jpg'
const NewsAndUpdates = () => {
  return (
    <div className="news-and-updates-container">
        <div className="nUTitle">
          <div className="circle-bg"></div>
          <p><span className='blue-text'>News</span> And Updates</p>
        </div>
        <div className="news-bottom">
        <div className="left-side">
          <div className="big-news-img-container">
            <div className="big-new-img">
            <img src={newsimg} alt="" />
            </div>
            <div className="catagory-detail">
              <div>
              <div className="news-category">
              Technology
              </div>
              <p className="news-small-detail">Berhane Mewa who is a former graduate of Poly-TechnicLorem ipsum dolor sit amet consectetur adipisicing elit...</p>
              </div>
              <p className="news-date">Bahir dar University, Washera Hall FEB 25 2023 </p>
            </div>
            
          </div>
          <div className="headline-container">
          <div className="headline-box">HeadLine</div>
          <div className="headline-texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto pariatur elit am</p>
          </div>
          </div>
        </div>
        <div className="right-side">
        <div className="news-timing-nav">
          <ul>
            <li>Latest</li>
            <li>Yesterday</li>
            <li>Last week</li>
          </ul>
        </div>
        <div className="categorized-news-container">
        <div className="each-news">
          <div className="small-news-img">
            <img src={newsSmallImg} alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src={newsSmallImg2} alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src={newsSmallImg3} alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src={newsSmallImg} alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src={newsSmallImg} alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default NewsAndUpdates