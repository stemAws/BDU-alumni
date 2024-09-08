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
            A decade after the establishment of Haile Sellase I University, the
            Imperial Government of Ethiopia signed an agreement with the United
            National Development Program (UNDP) and the United Nations
            Educational, Scientific and Cultural Organization (UNESCO) to set up
            another higher education institution. To that end, two experts from
            the University of London came to Ethiopia and conducted a
            feasibility study. In their report submitted to the Ethiopian
            government, UNDP and UNESCO, they suggested the establishment of a
            college known as Academy of Pedagogy in Bahir Dar. That came into
            effect in 1972 with the foundation of the Academy at the cost of 5.5
            million Birr. At the time of its establishment, the Academy was
            planned to be the best model higher education institution in the
            field of Pedagogy for the whole African continent.
          </p>
        </div>
        <img src={i2} alt="" />
      </div>

      <div className="pimg3">
        <div className="ptext">
          <span className="border trans">HOW THEY MERGED</span>
        </div>
      </div>

      <div className="section section-dark ">
        <div className="section-discription">
          <h1 className="section-one"> BDU </h1>
          <p>
            {" "}
            Prior to the establishment of Bahir Dar University, the Polytechnic
            Institute and the Bahir Dar Teachers College upgraded all their
            diploma programs to a degree level in 1996. Then in May, 2000, the
            two colleges were united to form Bahir Dar University. While the
            former Polytechnic Institute became the Engineering Faculty, the
            Bahir Dar Teachers College was renamed the Faculty of Education. In
            less than a decade, new schools, faculties and colleges came into
            existence. At the Engineering Faculty, all departments were raised
            to school levels in 2010. Then, a year later, they evolved into two
            technology institutes.
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
