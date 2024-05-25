const CategorizedNews = ({news}) => {
  return (
    <div className="each-news">
          <div className="small-news-img">
            <img src={news.img} alt="" />
          </div>
          <div className="news-detail">
          <p className="news-description">{news.description}</p>
          <p className="news-date-side">{news.date}</p>
          </div>
        </div>
  )
}

export default CategorizedNews