import Header from '../component/Header'
import Chapters from './Chapters'
import Events from './Events'
import NewsAndUpdates from './NewsAndUpdates'
import Stories from './Stories'
const MainPage = () => {
  return (
    <div>
        <Header />
        <NewsAndUpdates />
        <Events/>
        <Stories/>
        <Chapters/>
    </div>
  )
}

export default MainPage