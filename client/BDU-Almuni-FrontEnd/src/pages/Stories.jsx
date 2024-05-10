import '../styles/stories.css'
import i1 from '../assets/i1.jpg'
const Stories = () => {
  return (
    <div className='stories'>
        <div className='stories_heading'> <span>Top </span>Stories</div>
        <div className='stroy-container'>
        <div className='individual-stories'>
            <div className="img-container"><img src={i1}/></div>
            <div className='story-discription' >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum vitae consequatur animi quaerat velit sed molestiae similique blanditiis consectetur ipsa.
                </p>
                <a href='readmore'>Read more</a>
            </div>
        </div>

        <div className='individual-stories'>
            <div className="img-container"><img src={i1}/></div>
            <div className='story-discription' >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum vitae consequatur animi quaerat velit sed molestiae similique blanditiis consectetur ipsa.
                </p>
                <a href='readmore'>Read more</a>
            </div>
        </div>

        <div className='individual-stories'>
            <div className="img-container"><img src={i1}/></div>
            <div className='story-discription' >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum vitae consequatur animi quaerat velit sed molestiae similique blanditiis consectetur ipsa.
                </p>
                <a href='readmore'>Read more</a>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Stories