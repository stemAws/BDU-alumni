import React from 'react'
import '../styles/History.css'
import i2 from '../assets/i2.png'
import bdu from '../assets/bdu.jpg'

const History = () => {
  return (
    <div className='historyContainer'>
        
      <div class="pimg2">
        <div class="ptext">
            <span class="border trans"> 
                image two text     
            </span>
        </div>
    </div>
    <section class="section section-light " >
        <div className='sectionflex'>
        <img src={bdu}/>
        <div>
        <h1 class="section-one"> OUR HISTORY </h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum magni fugit ipsam voluptatem repudiandae, dignissimos rerum, veritatis praesentium facere velit, ea architecto veniam porro asperiores omnis natus quae? Minima obcaecati voluptatum fuga ipsam mollitia nobis hic totam eligendi nesciunt doloremque maxime adipisci ipsum, corrupti, optio dolore ullam temporibus sunt, quasi saepe fugiat id ea! Ipsa animi earum alias iusto ab? Odio vitae quidem voluptates inventore. Ipsam illum iste, eligendi voluptatum ipsa quis sequi harum magni. Dicta vel fugit omnis, velit, beatae odit fugiat aperiam, sit aspernatur nemo molestiae nam labore quam ipsam? Voluptatem nisi beatae dolores illo ipsa facere magnam?</p>
        </div>
        </div>
    </section>
      
    
    <div class="pimg2">
        <div class="ptext">
            <span class="border trans"> 
                image two text     
            </span>
        </div>
    </div>

    <section class="section section-dark ">
        <div className='section-discription'>
        <h1 class="section-one"> section two</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, quis fuga eveniet explicabo expedita exercitationem odio animi pariatur soluta quibusdam omnis ea. Aliquid ex tempore tenetur perferendis quisquam, maiores inventore.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum magni fugit ipsam Ipsam illum iste, eligendi voluptatum ipsa quis sequi harum magni. Dicta vel fugit omnis, velit, beatae odit fugiat aperiam, sit aspernatur nemo molestiae nam labore quam ipsam? Voluptatem nisi beatae dolores illo ipsa facere magnam?</p>
        </div>
    </section>

    <div class="pimg3">
        <div class="ptext">
            <span class="border trans"> 
                image three text     
            </span>
        </div>
    </div>

    <section class="section section-dark ">
      <div className='section-discription'>
        <h1 class="section-one"> section three</h1>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sit eveniet quas, officia voluptatibus molestiae nemo harum molestias nobis sed!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum magni fugit ipsam Ipsam illum iste, eligendi voluptatum ipsa quis sequi harum magni. Dicta vel fugit omnis, velit, beatae odit fugiat aperiam, sit aspernatur nemo molestiae nam labore quam ipsam? Voluptatem nisi beatae dolores illo ipsa facere magnam?</p>
        </div>
        <img src={i2} alt="" />
    </section>

    </div>
  )
}

export default History