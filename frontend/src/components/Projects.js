import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import proj1 from "../assets/img/proj1.png";
import proj2 from "../assets/img/proj2.png";
import proj3 from "../assets/img/proj3.png";
import proj4 from "../assets/img/proj4.png";
// import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "UX/UI Design",
      description: "Design & Development",
      imgUrl: proj1,
      details: "UX/UI interaction prototyping for a code learning website with sections for course learning, user challenges, user profiles, etc.",
      url: "https://www.youtube.com/watch?v=-jaFJyww54k&list=PL5xaop_CWMIHNbsN1dPZB664yuMuU-KdA&index=6"

    },
    {
      title: "UX/UI Design",
      description: "Design & Development",
      imgUrl: proj2,
      details: "Interactive prototype design for a Chinese traditional culture website, including activity display, culture introduction, contact and other sections.",
      url: "https://www.youtube.com/watch?v=Sm3xAbAo3XQ&list=PL5xaop_CWMIHNbsN1dPZB664yuMuU-KdA&index=7"
    },
    {
      title: "Development web",
      description: "Design & Development",
      imgUrl: proj3,
      details: "A new energy electric car accessories e-commerce website development, including product display, shopping cart and payment and other functions",
      url: "https://jatrhg.com/"
    },
    {
      title: "Development web",
      description: "Design & Development",
      imgUrl: proj4,
      details: "Full-stack development of the task management system, the front-end using the React framework, the back-end using Java spring-boot, and postgreSQL database",
      url: "https://youtu.be/7S8W8y4kvxY"
    }
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>My Projects</h2>
                <br/><br/>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row className="justify-content-center">
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="section">
                      <p>this is website of wenjun</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>this is website of wenjun.</p>
                    </Tab.Pane> */}
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
