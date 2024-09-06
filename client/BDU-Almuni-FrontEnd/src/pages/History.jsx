import React from "react";
import "../styles/History.css";
import i2 from "../assets/i2.png";
import Janhoy from "../assets/Janhoy.png";

const History = () => {
  return (
    <div className="historyContainer">
      <div className="pimg1">
        <div className="ptext">
          <span className="border trans">
            <h1 className="section-one">
              {" "}
              OUR <span className="start">HISTORY</span>{" "}
            </h1>
          </span>
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima cumque reprehenderit corporis, cum et consectetur quibusdam odit a sed eveniet?</p> */}
        </div>
      </div>
      <div className="section section-light ">
        <div className="sectionflex">
          <img src={Janhoy} />
          <div>
            <h3>ABOUT POLY</h3>
            <p>
              This is a brief history of two academic institutes whose merger
              led to the birth of Bahir Dar University. It was prepared on the
              occasion of the 50th anniversary of the former Polytechnic
              Institute. The Institute was the result of a bilateral agreement
              between Ethiopia and the former Soviet Union. In the summer of
              1959, Emperor Haile Sillase paid an official visit to Moscow and
              held discussion with the Soviet premier, Nikita Khrushchev. The
              visit was attended by the signing of an agreement between the two
              leaders. By that agreement, the Soviet government pledged to give
              Ethiopia economic and technical aid. As a gift to the Ethiopian
              government, the Soviets also decided to build a special technical
              school. Thanks to the Soviet support, the emperor laid the corner
              stone for the foundation of a technical school in Bahir Dar on 30
              December 1961. The construction of classrooms, offices,
              dormitories (with 400 beds), a library, and a multipurpose
              auditorium was completed in a matter of 18 months. On 11 June
              1963, the emperor came back to Bahir Dar to inaugurate the Bahir
              Dar Technical High School. Because of the heavy soviet involvement
              in construction and training activities, the technical school was
              sometimes known as the “Moscov School” by the local people.
            </p>
          </div>
        </div>
      </div>

      <div className="pimg2">
        <div className="ptext">
          <span className="border trans">About PEDA</span>
        </div>
      </div>

      <div className="section section-dark ">
        <div className="section-discription">
          <h1 className="section-one"> PEDA</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            omnis iure quos doloremque pariatur error deserunt enim nam ratione?
            Earum, provident laborum laboriosam atque beatae ducimus reiciendis
            reprehenderit error ea nemo impedit officiis ipsa saepe quam maxime
            iste, veniam sed! Ut tempore natus voluptatem aspernatur minus atque
            nisi porro commodi neque facilis tempora provident nesciunt fugiat
            nobis officia, modi doloremque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Commodi sit eveniet quas, officia
            voluptatibus molestiae nemo harum molestias nobis sed!Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Illum magni fugit ipsam
            Ipsam illum iste, eligendi voluptatum ipsa quis sequi harum magni.
            Dicta vel fugit omnis, velit, beatae odit fugiat aperiam, sit
            aspernatur nemo molestiae nam labore quam ipsam? Voluptatem nisi
            beatae dolores illo ipsa facere magnam?
          </p>
        </div>
        <img src={i2} alt="" />
      </div>

      <div className="pimg3">
        <div className="ptext">
          <span className="border trans">HOW THEY EMERGED</span>
        </div>
      </div>

      <div className="section section-dark ">
        <div className="section-discription">
          <h1 className="section-one"> BDU </h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            consequatur veritatis necessitatibus error cumque obcaecati autem in
            ratione odio sit inventore ducimus optio quia reiciendis, sequi
            suscipit aliquid alias vero itaque, non eius blanditiis. Mollitia,
            porro quia suscipit unde, dolores exercitationem voluptates
            perspiciatis consectetur, eveniet fugiat quam inventore ducimus
            officia.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quod, quis fuga eveniet explicabo expedita exercitationem odio animi
            pariatur soluta quibusdam omnis ea. Aliquid ex tempore tenetur
            perferendis quisquam, maiores inventore.Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Illum magni fugit ipsam Ipsam illum
            iste, eligendi voluptatum ipsa quis sequi harum magni. Dicta vel
            fugit omnis, velit, beatae odit fugiat aperiam, sit aspernatur nemo
            molestiae nam labore quam ipsam? Voluptatem nisi beatae dolores illo
            ipsa facere magnam?
          </p>
        </div>

        <div className="sectiondarkHeader">
          <h3>
            {" "}
            HOW WE <span className="start">STARTED </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default History;
