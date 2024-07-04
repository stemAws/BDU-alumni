import Stories from './Stories';
import Events from './Events';
import NewsAndUpdates from './NewsAndUpdates'
const MainBody = () => {
  return (
    <div>
        <NewsAndUpdates />
        <Events/>
        <Stories/>
    </div>
  )
}

export default MainBody