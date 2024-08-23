import '../styles/newsAndUpdates.css'
import newsimg from '../assets/images/photo_2024-02-25_23-41-53.jpg'
import newsSmallImg from '../assets/images/photo_2024-02-25_23-38-22.jpg'
import newsSmallImg2 from '../assets/images/photo_2024-02-27_14-20-33.jpg'
import newsSmallImg3 from '../assets/images/photo_2024-02-25_16-12-11.jpg'
// import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react'
import MultipleCategorizedNews from '../component/MultipleCategorizedNews'
import TodayNews from '../component/TodayNews'
const NewsAndUpdates = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  // const [exitingView, setExitingView] = useState(false);
  const [headlines,setheadlines] = useState([
  ]);
  const [navValue, setnavValue] = useState("latest")
  const [multipleNews, setmultipleNews] = useState([
 
])
  const [clickedNews, setclickedNews] = useState({
  }
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex(prevIndex => (prevIndex + 1) % headlines.length);
    },3000); 
    return () => clearInterval(interval);
  }, [headlines.length]);
  // const handleIntersection = (entries) => {
  //   entries.forEach(entry => {
  //     if (!entry.isIntersecting) {
  //       setExitingView(true);
  //     } else {
  //       setExitingView(false);
  //     }
  //   });
  // };
  // const { ref, inView } = useInView({
  //         triggerOnce: true,
  //         threshold: 0.05,
  //         onChange:handleIntersection 
  //       });

useEffect(()=>{
  const fetchNews=async()=>{
    try {
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/all-news`,{
          credentials: 'include',
        })
        const newsFromServer= await res.json()
       

        if (!res.ok) {
          console.error("couldn't fetch the news")
        }
        else{
          setmultipleNews(newsFromServer)
          setheadlines(newsFromServer.map(item => `${item.category}: ${item.title}`))
    }} catch (error) {
      console.error("couldn't fetch the news",error)
      
    }
  }
  fetchNews();
},[])
useEffect(()=>{
const defaultNews=()=>{
  newsClicked(multipleNews[multipleNews.length-1]?.newsId)
 document.querySelector(`.each-news`)?.classList.add("clicked")
  
}
defaultNews()
},[multipleNews])
const newsClicked=(id)=>{
  setclickedNews(multipleNews.find(news => news.newsId === id))
}
const handleNav=(nav)=>{
setnavValue(nav)
}


  return (
    <div className="news-and-updates-container">
        <div className="nUTitle">
          <div className="circle-bg"></div>
          <p><span className='blue-text'>News</span> <span className='white-text'>And</span> Updates</p>
        </div>
        <div className="news-bottom">
        <div className="left-side">
          {
            multipleNews.length > 0 && (
              <TodayNews news={clickedNews} />
            )
          }
          <div className="headline-container">
          <div className="headline-box">HeadLine</div>
          <div className="headline-texts">
            <p>{headlines[currentHeadlineIndex]}</p>
          </div>
          </div>
        </div>
        <div className="right-side">
        <div className="news-timing-nav">
          <ul>
            <li onClick={()=>handleNav("latest")}>Latest</li>
            <li onClick={()=>handleNav("yesterday")}>Yesterday</li>
            <li onClick={()=>handleNav("lastWeek")}>Last week</li>
          </ul>
        </div>
        <div className="categorized-news-container">
        {
          multipleNews.length >0 &&(
            <MultipleCategorizedNews newsClicked={newsClicked} navValue={navValue} multiplecataNews={multipleNews} />
          )
        }
        </div>
        </div>
        </div>
    </div>
  )
}

export default NewsAndUpdates