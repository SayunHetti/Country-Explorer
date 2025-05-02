import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSignInAlt,
  FaUserPlus,
  FaGlobe,
  FaChartLine,
  FaUsers,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect them
  if (user) {
    navigate("/Dashboard");
    return null;
  }

  // Popular countries data
  const popularCountries = [
    {
      name: "France",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capital: "Paris",
      description:
        "The city of love and lights, famous for its art, fashion, and cuisine.",
    },
    {
      name: "Japan",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capital: "Tokyo",
      description: "A blend of ancient traditions and cutting-edge technology.",
    },
    {
      name: "Italy",
      image:
        "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capital: "Rome",
      description:
        "Home to some of the world's most famous historical landmarks.",
    },
    {
      name: "Brazil",
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      capital: "Brasília",
      description:
        "Vibrant culture, stunning beaches, and the Amazon rainforest.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page overflow-hidden"
    >
      {/* Hero Section */}
      <section
        className="hero-section py-5"
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="display-3 fw-bold mb-4 text-gradient"
                style={{
                  background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Explore the World With Us
              </motion.h1>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="lead mb-4 fs-4 text-muted"
              >
                Discover detailed information about every country, connect with
                travelers, and plan your next adventure.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="d-flex gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="btn btn-primary btn-lg px-4 mb-2 shadow"
                  style={{ borderRadius: "50px" }}
                >
                  <FaSignInAlt className="me-2" />
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="btn btn-outline-primary btn-lg px-4 mb-2 shadow-sm"
                  style={{ borderRadius: "50px" }}
                >
                  <FaUserPlus className="me-2" />
                  Register
                </motion.button>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="position-relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="World map"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{
                    border: "10px solid white",
                    transform: "perspective(1000px) rotateY(-10deg)",
                  }}
                />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="position-absolute top-0 start-0 translate-middle"
                  style={{ zIndex: 1 }}
                >
                  <div className="bg-white p-2 rounded-circle shadow">
                    <FaMapMarkerAlt className="text-danger" size={24} />
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="position-absolute bottom-0 end-0 translate-middle"
                  style={{ zIndex: 1 }}
                >
                  <div className="bg-white p-2 rounded-circle shadow">
                    <FaMapMarkerAlt className="text-primary" size={24} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="features-section py-5"
        style={{ background: "linear-gradient(to bottom, #ffffff, #f8f9fa)" }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5 display-4 fw-bold"
            style={{
              background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose Our Platform?
          </motion.h2>

          <div className="row g-4">
            {[
              {
                icon: (
                  <FaGlobe
                    size={40}
                    className="mb-3"
                    style={{ color: "#3a7bd5" }}
                  />
                ),
                title: "Explore Countries",
                desc: "Search and discover detailed information about every country in the world with interactive maps and statistics.",
              },
              {
                icon: (
                  <FaChartLine
                    size={40}
                    className="mb-3"
                    style={{ color: "#00d2ff" }}
                  />
                ),
                title: "Data Insights",
                desc: "Access up-to-date statistics on populations, capitals, regions, GDP, and more with beautiful visualizations.",
              },
              {
                icon: (
                  <FaUsers
                    size={40}
                    className="mb-3"
                    style={{ color: "#3a7bd5" }}
                  />
                ),
                title: "Global Community",
                desc: "Join a community of travelers and geography enthusiasts to share experiences and knowledge.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="col-md-4"
              >
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="card-body text-center p-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="h4 mb-3">{feature.title}</h3>
                    <p className="text-muted mb-0">{feature.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Countries Section */}
      <section className="popular-countries py-5 bg-dark text-white">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5 display-4 fw-bold"
            style={{
              background: "linear-gradient(90deg, #ffffff, #cccccc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Most Popular Destinations
          </motion.h2>

          <div className="row g-4">
            {popularCountries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="col-md-6 col-lg-3"
              >
                <div
                  className="card h-100 border-0 overflow-hidden shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={country.image}
                      alt={country.name}
                      className="img-fluid w-100 h-100 object-cover"
                      style={{ transition: "all 0.5s ease" }}
                    />
                  </div>
                  <div className="card-body bg-white text-dark">
                    <h3 className="h5 fw-bold">{country.name}</h3>
                    <p className="text-muted small mb-2">
                      <FaMapMarkerAlt className="text-danger me-1" />
                      {country.capital}
                    </p>
                    <p className="mb-3">{country.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="btn btn-sm btn-outline-primary align-items-center d-inline-flex"
                      onClick={() => navigate("/register")}
                    >
                      Explore <FaArrowRight className="ms-2" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="cta-section py-5 position-relative"
        style={{
          background: "linear-gradient(135deg, #3a7bd5, #00d2ff)",
          overflow: "hidden",
        }}
      >
        <div
          className="container text-center position-relative"
          style={{ zIndex: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-white display-4 fw-bold">
              Ready to explore the world?
            </h2>
            <p className="lead mb-4 text-white-50">
              Join our community of travelers today
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="btn btn-light btn-lg px-4 fw-bold"
              style={{
                borderRadius: "50px",
                color: "#3a7bd5",
              }}
            >
              <FaUserPlus className="me-2" />
              Create Free Account
            </motion.button>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="position-absolute top-0 start-0"
          style={{
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          <FaGlobe size={200} color="white" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
          className="position-absolute bottom-0 end-0"
          style={{
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          <FaGlobe size={300} color="white" />
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HomePage;
