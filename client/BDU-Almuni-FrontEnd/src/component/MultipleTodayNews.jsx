import TodayNews from "./TodayNews"
const MultipleTodayNews = ({multipleNews}) => {
  return (
    <>
        {multipleNews.slice(-1).reverse().map((news,index)=>{
          return(
          <TodayNews
          news={news}
          key={index}
          />
        )  
        })}
    </>
  )
}

export default MultipleTodayNews