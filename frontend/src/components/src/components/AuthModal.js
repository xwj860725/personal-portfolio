import { Modal } from "react-bootstrap";
import { useState } from "react";

export const AuthModal = ({ show, onHide }) => {
  const [authMethod, setAuthMethod] = useState("phone"); // 'phone' | 'email'

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign in / Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Tabs */}
        <div className="auth-tabs">
          <span
            className={`auth-tab ${authMethod === "phone" ? "active" : ""}`}
            onClick={() => setAuthMethod("phone")}
          >
            Phone
          </span>
          <span
            className={`auth-tab ${authMethod === "email" ? "active" : ""}`}
            onClick={() => setAuthMethod("email")}
          >
            Email
          </span>
        </div>

        {/* Content */}
        {authMethod === "phone" && <PhoneAuthForm />}
        {authMethod === "email" && <EmailAuthForm />}
      </Modal.Body>
    </Modal>
  );
};

/* ---------------- Sub components ---------------- */

const PhoneAuthForm = () => {
  return (
    <div className="auth-form">
      <input
        type="tel"
        placeholder="+33 (0)x xx xx xx xx"
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Your password"
        className="auth-input"
      />
      <button className="auth-btn primary">Send OTP</button>
    </div>
  );
};

const EmailAuthForm = () => {
  return (
    <div className="auth-form">
      <input
        type="email"
        placeholder="Your email"
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Your password"
        className="auth-input"
      />
      <button className="auth-btn primary">Login / Register</button>

      {/* 预留：Google OAuth */}
      <div className="auth-divider">OR</div>
      <button className="auth-btn google">
        Continue with Google
      </button>
    </div>
  );
};
