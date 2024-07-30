import { Fa500Px } from 'react-icons/fa'
import Button from '../../component/Button'
import '../../styles/pageNotFound.css'
import {Link} from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='not_found admin-not_found'>
        <Fa500Px size={50} />
        <p className='four04'>404</p>
         <p>Sorry, Page Not Found</p>
        <Link to='/admin/home'><Button text={'Home'}/></Link> 
            </div>
  )
}

export default PageNotFound