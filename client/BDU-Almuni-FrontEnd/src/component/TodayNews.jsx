const TodayNews = ({news}) => {
  return (
    <div className="big-news-img-container">
    <div className="big-new-img">
    <img src={news?.imagePath} alt="" />
    </div>
    <div className="catagory-detail">
      <div>
      <div className="news-category">
      {news?.category}
      </div>
      <p className="news-small-detail">{news?.content}</p>
      </div>
      <p className="news-date">{news?.location} {news?.createdAt} </p>
    </div>
    
  </div>
  )
}

export default TodayNews