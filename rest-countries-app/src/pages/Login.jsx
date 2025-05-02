import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGlobe,
} from "react-icons/fa";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithEmail = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! Redirecting...");
      navigate("/Dashboard");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate("/Dashboard");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAuthError = (error) => {
    let message = "Login failed.";
    switch (error.code) {
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password.";
        break;
      case "auth/invalid-email":
        message = "Invalid email address.";
        break;
      case "auth/invalid-credential":
        message = "Invalid credentials provided.";
        break;
      case "auth/popup-closed-by-user":
        return; // Don't show error if user closed popup intentionally
      default:
        message = error.message;
    }
    toast.error(message);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              <div className="row g-0">
                {/* Visual Side */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="col-lg-5 d-none d-lg-flex text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="p-4 d-flex flex-column justify-content-center">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-center mb-4"
                    >
                      <FaGlobe size={60} className="mb-3" />
                      <h2 className="h3">Explore The World</h2>
                    </motion.div>
                    <p className="small text-center">
                      Login to access your personalized dashboard and continue
                      your global journey.
                    </p>

                    {/* Animated background elements */}
                    <motion.div
                      animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="position-absolute"
                      style={{
                        bottom: "-50px",
                        right: "-50px",
                        opacity: 0.1,
                      }}
                    >
                      <FaGlobe size={150} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Form Side */}
                <div className="col-lg-7">
                  <div className="card-body p-4 p-md-5">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="text-center mb-4">
                        <h2
                          className="fw-bold mb-3"
                          style={{
                            background:
                              "linear-gradient(90deg, #667eea, #764ba2)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Welcome Back!
                        </h2>
                        <p className="text-muted">
                          Sign in to continue your exploration
                        </p>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="form-label small text-muted"
                        >
                          EMAIL ADDRESS
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-transparent">
                            <FaEnvelope className="text-primary" />
                          </span>
                          <input
                            type="email"
                            className="form-control border-start-0"
                            id="email"
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ paddingLeft: "0" }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="form-label small text-muted"
                        >
                          PASSWORD
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-transparent">
                            <FaLock className="text-primary" />
                          </span>
                          <input
                            type="password"
                            className="form-control border-start-0"
                            id="password"
                            placeholder="••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ paddingLeft: "0" }}
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={loginWithEmail}
                        className="btn btn-primary w-100 py-2 mb-3"
                        style={{ borderRadius: "50px" }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <>
                            Login <FaArrowRight className="ms-2" />
                          </>
                        )}
                      </motion.button>

                      <div className="position-relative my-4">
                        <hr />
                        <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
                          OR CONTINUE WITH
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={loginWithGoogle}
                        className="btn btn-outline-danger w-100 py-2 mb-3 d-flex align-items-center justify-content-center"
                        style={{ borderRadius: "50px" }}
                        disabled={googleLoading}
                      >
                        {googleLoading ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <>
                            <FaGoogle className="me-2" />
                            Google
                          </>
                        )}
                      </motion.button>

                      <div className="text-center mt-4">
                        <p className="small text-muted">
                          Don't have an account?{" "}
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="/register"
                            className="text-primary fw-bold text-decoration-none"
                          >
                            Create Account
                          </motion.a>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
