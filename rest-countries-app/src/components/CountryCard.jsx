import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaCity,
  FaUsers,
  FaLanguage,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";

const CountryCard = ({ country }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <Card
        className="shadow-sm h-100 border-0"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Card.Header
          className="text-white py-3"
          style={{
            background: "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
            borderBottom: "none",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0 fw-bold">
              {country.name.common}
            </Card.Title>
            {country.flag && (
              <div style={{ fontSize: "1.5rem" }}>{country.flag}</div>
            )}
          </div>
        </Card.Header>

        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="img-fluid rounded shadow"
              style={{
                width: "160px",
                height: "100px",
                objectFit: "cover",
                border: "3px solid white",
              }}
            />
          </div>

          <div className="country-details">
            <div className="d-flex align-items-center mb-2">
              <FaCity className="text-primary me-2" />
              <span className="fw-medium">Capital:</span>
              <span className="ms-2">{country.capital?.[0] || "N/A"}</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <FaGlobe className="text-primary me-2" />
              <span className="fw-medium">Region:</span>
              <span className="ms-2">
                {country.region}
                {country.subregion && `, ${country.subregion}`}
              </span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <FaUsers className="text-primary me-2" />
              <span className="fw-medium">Population:</span>
              <span className="ms-2">
                {country.population.toLocaleString()}
              </span>
            </div>

            {country.languages && (
              <div className="d-flex align-items-start mb-2">
                <FaLanguage className="text-primary me-2 mt-1" />
                <div>
                  <span className="fw-medium">Languages:</span>
                  <div className="d-flex flex-wrap mt-1">
                    {Object.values(country.languages).map((lang, index) => (
                      <Badge
                        key={index}
                        bg="light"
                        text="dark"
                        className="me-2 mb-1"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {country.currencies && (
              <div className="d-flex align-items-start mb-3">
                <FaMoneyBillWave className="text-primary me-2 mt-1" />
                <div>
                  <span className="fw-medium">Currencies:</span>
                  <div className="d-flex flex-wrap mt-1">
                    {Object.values(country.currencies).map((curr, index) => (
                      <Badge
                        key={index}
                        bg="light"
                        text="dark"
                        className="me-2 mb-1"
                      >
                        {curr.name} ({curr.symbol || "—"})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="d-grid mt-3"
          >
            <Button
              as={Link}
              to={`/country/${country.cca3}`}
              variant="primary"
              className="fw-bold py-2 d-flex align-items-center justify-content-center"
              style={{ borderRadius: "50px" }}
            >
              Explore Country <FaArrowRight className="ms-2" />
            </Button>
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CountryCard;
