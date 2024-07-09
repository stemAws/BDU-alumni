const CategorizedNews = ({news,newsClicked}) => {
  const handleId=(id)=>{
    newsClicked(id)
    document.querySelectorAll(`.each-news`).forEach((news)=>{
      news.classList.remove("clicked")
    })
    document.querySelector(`.each-news.n${id}`).classList.add("clicked")
  }
  return (
    <div onClick={()=>handleId(news.newsId)} className={`each-news n${news.newsId}`}>
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