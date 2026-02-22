import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const sendOtp = async (phone) => {
  const res = await fetch('http://localhost:3001/auth/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return res.json();
};
const verifyOtp = async (phone, otp, mode, password) => {
  const res = await fetch("http://localhost:3001/auth/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp, mode, password }),
  });
  return res.json();
};

export const AuthModal = ({ show, onHide, initialMode }) => {
  const [mode, setMode] = useState(initialMode || "login"); // sign up | login
  //const [method, setMethod] = useState("phone");  phone | email
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");


  const resetState = () => {
  setMode("register");
  // setMethod("phone");
  setOtpSent(false);
  setPhone("");
  setOtp("");
};

  useEffect(() => {
    if (show) {
      setMode(initialMode);
      setOtpSent(false);
      setPhone("");
      setOtp("");
    }
  }, [show, initialMode]);

  return (
    <Modal show={show} onHide={() => {
      resetState();
      onHide();
      }}
      centered>

      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "register" ? "Create your account" : "Welcome back"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* mode switch */}
        <div className="auth-switch">
          <span
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setOtpSent(false);
            }}
          >
            Login
          </span>
          <span
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setOtpSent(false);
            }}
          >
            Sign up
          </span>
        </div>

        {/* method switch */}
        <div className="auth-method">
          <button className="active">Phone</button>
          <button disabled>Email</button>
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+33 (0)x xx xx xx xx"
              disabled={otpSent}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {otpSent && (
            <Form.Group className="mb-3">
              <Form.Label>OTP Code</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

            </Form.Group>
          )}

          {!otpSent ? (
            <Button
              type="button"
              className="w-100"
              onClick={async () => {
                console.log("SEND OTP CLICKED", phone);
                const result = await sendOtp(phone);
                if (result.ok) setOtpSent(true);
              }}
            >
              Send Code
            </Button>
          ) : (
            <Button
              type="button"
              className="w-100"
              onClick={async () => {
              // const actionMode = mode === "register" ? "register" : "login";
              const result = await verifyOtp(phone, otp, mode, password);

              if (result.ok) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", String(result.userId));
                window.dispatchEvent(new Event("auth-changed"));

                if (result.action === "registered") {
                  alert("Your account is created, you're logged in.");
                }

                if (result.action === "logged_in") {
                  alert("Login successfully.");
                }

                resetState();
                onHide();
              } else {
                alert(result.message || "Authentication failed. Please try again.");
              }


              }}
            >
              {mode === "register"
                ? "Verify & Create account"
                : "Verify & Login"}
            </Button>

          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
