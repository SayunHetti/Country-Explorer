import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaKey,
  FaImage,
  FaGlobe,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.title = "Your Profile | World Explorer";
  }, [user]);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mt-5"
      >
        <div className="alert alert-warning shadow-sm">
          You must be logged in to view your profile.
        </div>
      </motion.div>
    );
  }

  const providerName = user.providerData[0]?.providerId
    .replace(".com", "")
    .replace("google", "Google")
    .replace("password", "Email/Password");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="profile-page min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card shadow-lg border-0 overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="card-header py-4"
                style={{
                  background:
                    "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 text-white d-flex align-items-center">
                    <FaUser className="me-2" />
                    My Profile
                  </h4>
                </div>

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
                  <FaUser size={150} color="white" />
                </motion.div>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="row align-items-center">
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="position-relative"
                    >
                      <img
                        src={
                          user.photoURL ||
                          "https://static.vecteezy.com/system/resources/previews/026/222/070/original/profile-icon-symbol-design-illustration-vector.jpg"
                        }
                        alt="User Avatar"
                        className="img-fluid rounded-circle shadow-sm"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          border: "5px solid white",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>

                  <div className="col-md-8">
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="profile-details"
                    >
                      <div className="mb-4">
                        <h5 className="d-flex align-items-center text-muted mb-3">
                          <FaUser className="me-2" />
                          <span>Display Name</span>
                        </h5>
                        <motion.p
                          whileHover={{ x: 5 }}
                          className="ms-4 fs-4 fw-bold text-dark"
                        >
                          {user.displayName || "Not provided"}
                        </motion.p>
                      </div>

                      <div className="mb-4">
                        <h5 className="d-flex align-items-center text-muted mb-3">
                          <FaEnvelope className="me-2" />
                          <span>Email Address</span>
                        </h5>
                        <motion.p
                          whileHover={{ x: 5 }}
                          className="ms-4 fs-5 text-dark"
                        >
                          {user.email}
                        </motion.p>
                      </div>

                      <div className="mb-4">
                        <h5 className="d-flex align-items-center text-muted mb-3">
                          <FaKey className="me-2" />
                          <span>Login Method</span>
                        </h5>
                        <motion.p
                          whileHover={{ x: 5 }}
                          className="ms-4 fs-5 text-dark"
                        >
                          {providerName}
                        </motion.p>
                      </div>

                      <div className="mb-4">
                        <h5 className="d-flex align-items-center text-muted mb-3">
                          <FaCalendarAlt className="me-2" />
                          <span>Member Since</span>
                        </h5>
                        <motion.p
                          whileHover={{ x: 5 }}
                          className="ms-4 fs-5 text-dark"
                        >
                          {new Date(
                            user.metadata.creationTime
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="card-footer bg-light border-0 py-3"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Last login:{" "}
                    {new Date(user.metadata.lastSignInTime).toLocaleString()}
                  </small>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="btn btn-sm btn-outline-danger d-flex align-items-center"
                    style={{ borderRadius: "50px" }}
                  >
                    <FaSignOutAlt className="me-1" /> Sign Out
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
