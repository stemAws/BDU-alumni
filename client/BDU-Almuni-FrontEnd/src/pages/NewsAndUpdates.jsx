
const NewsAndUpdates = () => {
  return (
    <div className="news-and-updates-container">
        <div className="nUTitle">
          <p>News And Updates</p>
        </div>
        <div className="left-side">
          <div className="big-news-img-container">
            <div className="big-new-img">
            <img src="" alt="" />
            </div>
            <div className="news-category">
            <p>catagory</p>
            </div>
            <p className="news-small-detail">great news</p>
            <p className="news-date">feb 12 - 2024</p>
          </div>
          <div className="headline-container">
          <div className="headline-box">HeadLine</div>
          <div className="headline-texts">
            <p>he was a rich man</p>
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
          <div className="small-news-img"></div>
          <p className="news-detail">it was crazy</p>
          <p className="news-date">feb 12 - 2024</p>
        </div>
        </div>
        </div>
    </div>
  )
}

export default NewsAndUpdates