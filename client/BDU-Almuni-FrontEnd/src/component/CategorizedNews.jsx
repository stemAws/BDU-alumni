const CategorizedNews = ({news}) => {
  return (
    <div className="each-news">
          <div className="small-news-img">
            <img src={news.img} alt="" />
          </div>
          <div className="news-detail">
          <p className="news-description">{news.content}</p>
          <p className="news-date-side">{news.createdAt}</p>
          </div>
        </div>
  )
}

export default CategorizedNews