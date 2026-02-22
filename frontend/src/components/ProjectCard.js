// import { Row, Col } from "react-bootstrap";

// export const ProjectCard = ({ title, description, imgUrl, details, url}) => {
//   return (
//   // <Row className="justify-content-center">
//     <Col size={12} xs={12} sm={12} md={4} lg={4} xl={4} xxl={3}>
//       <div className="proj-imgbx">
//         <img src={imgUrl} />
//         <div className="proj-txtx">
//           <h4>{title}</h4>
//           <span>{description}</span>
//           <p style={{ color: "#fff", marginTop: "10px", fontSize: "1rem",  textAlign: "left" }}>{details}</p>
//           <a href={url} target="_blank" rel="noreferrer">
//          <button style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#ffde59", border: "none", color: "#fff", borderRadius: "6px" }}>
//           See projet
//          </button>
//         </a>
//         </div>
//       </div>
//     </Col>
//   // </Row>
//   )
// }

import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, details, url }) => {
  return (
    <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={3}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title || "Project image"} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <p style={{ color: "#fff", marginTop: "10px", fontSize: "1rem", textAlign: "left" }}>
            {details}
          </p>

          {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <button
                type="button"
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#ffde59",
                  border: "none",
                  color: "#fff",
                  borderRadius: "6px"
                }}
              >
                See project
              </button>
            </a>
          )}
        </div>
      </div>
    </Col>
  );
};