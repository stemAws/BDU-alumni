const TodayNews = ({news}) => {
  return (
    <div className="big-news-img-container">
    <div className="big-new-img">
    <img src={news.img} alt="" />
    </div>
    <div className="catagory-detail">
      <div>
      <div className="news-category">
      {news.category}
      </div>
      <p className="news-small-detail">{news.description}</p>
      </div>
      <p className="news-date">{news.location} {news.date} </p>
    </div>
    
  </div>
  )
}

export default TodayNews