// import meter1 from "../assets/img/meter1.svg";
// import meter2 from "../assets/img/meter2.svg";
// import meter3 from "../assets/img/meter3.svg";
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import arrow1 from "../assets/img/arrow1.svg";
// import arrow2 from "../assets/img/arrow2.svg";
// import colorSharp from "../assets/img/color-sharp.png"
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';


// export const Skills = () => {
//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 3
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 3
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1
//     }
//   };

//   return (
//     <section className="skill" id="skills">
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="skill-bx wow zoomIn">
//               <h2>Skills</h2>
//               <p><br></br></p>
//               <Carousel responsive={responsive} infinite={true} 
//               className="owl-carousel owl-theme skill-slider" showDots={false} arrows={false}>
//                   <div className="item" style={{ width: 150, height: 250, margin: "0 auto" }}>
//                     <CircularProgressbar value={90} text="90%" styles={buildStyles({ textColor: "#fff", pathColor: "#F52C83", trailColor: "#2d2d2d" })} />
//                     <h5 style={{ marginTop: "20px" }}>UX/UI<br></br>Design</h5>
//                   </div>
                  
//                   <div className="item" style={{ width: 150, height: 200, margin: "0 auto" }}>
//                     <CircularProgressbar value={80} text="80%" styles={buildStyles({ textColor: "#fff", pathColor: "#EDDD53", trailColor: "#2d2d2d" })} />
//                     <h5 style={{ marginTop: "20px" }}>Web Development</h5>
//                   </div>

//                   <div className="item" style={{ width: 150, height: 200, margin: "0 auto" }}>
//                     <CircularProgressbar value={35} text="35%" styles={buildStyles({ textColor: "#fff", pathColor: "#6FA8E8", trailColor: "#2d2d2d" })} />
//                     <h5 style={{ marginTop: "20px" }}>Game Development</h5>
//                   </div>
//               </Carousel>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p><br /></p>

              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
                showDots={false}
                arrows={false}
              >

                <div className="item" style={{ width: 150, height: 250, margin: "0 auto" }}>
                  <CircularProgressbar
                    value={90}
                    text="90%"
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#F52C83",
                      trailColor: "#2d2d2d"
                    })}
                  />
                  <h5 style={{ marginTop: "20px" }}>
                    UX/UI<br />Design
                  </h5>
                </div>

                <div className="item" style={{ width: 150, height: 200, margin: "0 auto" }}>
                  <CircularProgressbar
                    value={80}
                    text="80%"
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#EDDD53",
                      trailColor: "#2d2d2d"
                    })}
                  />
                  <h5 style={{ marginTop: "20px" }}>
                    Web Development
                  </h5>
                </div>

                <div className="item" style={{ width: 150, height: 200, margin: "0 auto" }}>
                  <CircularProgressbar
                    value={35}
                    text="35%"
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#6FA8E8",
                      trailColor: "#2d2d2d"
                    })}
                  />
                  <h5 style={{ marginTop: "20px" }}>
                    Game Development
                  </h5>
                </div>

              </Carousel>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};