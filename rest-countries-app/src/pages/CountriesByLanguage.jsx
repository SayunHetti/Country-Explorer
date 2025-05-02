// src/pages/CountriesByLanguage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CountryCard from "../components/CountryCard";
import useCountriesByLanguage from "../hooks/useCountriesByLanguage";

const CountriesByLanguage = () => {
  const { language } = useParams();
  const { countries, loading, error } = useCountriesByLanguage(language);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Countries where {language} is spoken</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {countries.map((country) => (
          <Col key={country.cca3}>
            <CountryCard country={country} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CountriesByLanguage;
