import '../styles/newsAndUpdates.css'
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
            <img src="" alt="" />
            </div>
            <div className="catagory-detail">
              <div className="news-category">
              catagory
              </div>
              <p className="news-small-detail">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, sunt alias. Fugit dolor, mollitia eum vitae a odio hic molestias distinctio in vel soluta voluptatem tempora icing elit...</p>
              <p className="news-date">feb 12 - 2024</p>
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
            <img src="" alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor praesentium ...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src="" alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor praesentium ...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        <div className="each-news">
          <div className="small-news-img">
            <img src="" alt="" />
          </div>
          <p className="news-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor praesentium ...
          <span className="news-date-side">feb 12 - 2024</span></p>
        </div>
        </div>
        </div>
        </div>
        
    </div>
  )
}

export default NewsAndUpdates