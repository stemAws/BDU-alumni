import '../styles/newsAndUpdates.css'
import newsimg from '../assets/images/photo_2024-02-25_23-41-53.jpg'
import newsSmallImg from '../assets/images/photo_2024-02-25_23-38-22.jpg'
import newsSmallImg2 from '../assets/images/photo_2024-02-27_14-20-33.jpg'
import newsSmallImg3 from '../assets/images/photo_2024-02-25_16-12-11.jpg'
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react'
import MultipleTodayNews from '../component/MultipleTodayNews'
import MultipleCategorizedNews from '../component/MultipleCategorizedNews'
const NewsAndUpdates = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [exitingView, setExitingView] = useState(false);
  const headlines = [
    "Breaking News: Lorem ipsum dolor sit amet consectetur adipisicing elit." ,
    "Weather Alert: Magni veritatis quidem quibusdam quam doloribus minus eveniet mollitia tempora",
    "Sports: fugiat eos consectetur consequuntur inventore",
    "Technology: fugiat eos consectetur consequuntur inventore aspernatur, libero aliquam fuga odit in consequatur"
  ];
  const [multipleNews, setmultipleNews] = useState([{
    img:`..${newsimg}`,
    category:"Technology",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatum modi ipsum laudantium ratione ullam placeat exercitationem officia delectus quaerat distinctio veniam beatae, numquam corporis veritatis assumenda libero dicta vitae",
    location:"Bahir dar University, Washera Hall",
    date:"FEB 25 2023"
  },
  {
    img:`..${newsSmallImg2}`,
    category:"Technology",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatum modi ipsum laudantium ratione ullam placeat exercitationem officia delectus quaerat distinctio veniam beatae, numquam corporis veritatis assumenda libero dicta vitae",
    location:"Bahir dar University, Washera Hall",
    date:"FEB 25 2023"
  },
  {
    img:`..${newsSmallImg3}`,
    category:"Technology",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatum modi ipsum laudantium ratione ullam placeat exercitationem officia delectus quaerat distinctio veniam beatae, numquam corporis veritatis assumenda libero dicta vitae",
    location:"Bahir dar University, Washera Hall",
    date:"FEB 25 2023"
  },
  {
    img:`..${newsSmallImg}`,
    category:"Technology",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatum modi ipsum laudantium ratione ullam placeat exercitationem officia delectus quaerat distinctio veniam beatae, numquam corporis veritatis assumenda libero dicta vitae",
    location:"Bahir dar University, Washera Hall",
    date:"FEB 25 2023"
  },
  {
    img:`..${newsimg}`,
    category:"Technology",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatum modi ipsum laudantium ratione ullam placeat exercitationem officia delectus quaerat distinctio veniam beatae, numquam corporis veritatis assumenda libero dicta vitae",
    location:"Bahir dar University, Washera Hall",
    date:"FEB 25 2023"
  }])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex(prevIndex => (prevIndex + 1) % headlines.length);
    },3000); 
    return () => clearInterval(interval);
  }, []);
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        setExitingView(true);
      } else {
        setExitingView(false);
      }
    });
  };
  const { ref, inView } = useInView({
          triggerOnce: true,
          threshold: 0.05,
          onChange:handleIntersection 
        });
  return (
    <div className="news-and-updates-container body">
        <div className="nUTitle">
          <div className="circle-bg"></div>
          <p><span className='blue-text'>News</span> And Updates</p>
        </div>
        <div className="news-bottom">
        <div className="left-side">
          {
            multipleNews.length > 0 && (
              <MultipleTodayNews multipleNews={multipleNews} />
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
            <li>Latest</li>
            <li>Yesterday</li>
            <li>Last week</li>
          </ul>
        </div>
        <div className="categorized-news-container">
        {
          multipleNews.length >0 &&(
            <MultipleCategorizedNews multiplecataNews={multipleNews} />
          )
        }
        </div>
        </div>
        </div>
    </div>
  )
}

export default NewsAndUpdates