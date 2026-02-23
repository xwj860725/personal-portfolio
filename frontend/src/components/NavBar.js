import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthModal } from "./AuthModal";
import logo from '../assets/img/wj1.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | register

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  // const [step, setStep] = useState('input'); input | otp | done
  // const [phone, setPhone] = useState('');
  // const [otp, setOtp] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);


useEffect(() => {
  const onAuthChanged = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  const onScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("auth-changed", onAuthChanged); // ✅ 新增
  window.addEventListener("scroll", onScroll);

  return () => {
    window.removeEventListener("auth-changed", onAuthChanged);
    window.removeEventListener("scroll", onScroll);
  };
}, []);


  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="navbar-content">

              <Nav className="navbar-links">
                <Nav.Link
                  href="#home"
                  className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                  onClick={() => onUpdateActiveLink('home')}
                >
                  Home
                </Nav.Link>

                <Nav.Link
                  href="#skills"
                  className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
                  onClick={() => onUpdateActiveLink('skills')}
                >
                  Skills
                </Nav.Link>

                <Nav.Link
                  href="#projects"
                  className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
                  onClick={() => onUpdateActiveLink('projects')}
                >
                  Projects
                </Nav.Link>
              </Nav>

              <div className="navbar-actions">

                <div className="social-icon">
                  <a href="#"><img src={navIcon1} alt="" /></a>
                  <a href="#"><img src={navIcon2} alt="" /></a>
                  <a href="#"><img src={navIcon3} alt="" /></a>
                </div>

                <HashLink to="#connect">
                  <button className="vvd">
                    <span>Let’s Connect</span>
                  </button>
                </HashLink>
{!isLoggedIn ? (
  <>
<span
  className="auth-link"
  onClick={() => {
    setAuthMode("login");
    setShowAuth(true);
  }}
>
  Login
</span>

<span
  className="auth-link"
  onClick={() => {
    setAuthMode("register");
    setShowAuth(true);
  }}
>
  Register
</span>

  </>
) : (
  <span
    className="auth-link"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
    }}
  >
    Logout
  </span>
)}

              </div>
            </div>
          </Navbar.Collapse>
   <AuthModal
  show={showAuth}
  onHide={() => setShowAuth(false)}
  initialMode={authMode}
/>

        </Container>
      </Navbar>
    </Router>
  );
};
