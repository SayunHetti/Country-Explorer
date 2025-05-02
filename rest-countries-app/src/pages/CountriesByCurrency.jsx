// src/pages/CountriesByCurrency.js
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CountryCard from "../components/CountryCard";
import useCountriesByCurrency from "../hooks/useCountriesByCurrency";

const CountriesByCurrency = () => {
  const { currency } = useParams();
  const { countries, loading, error } = useCountriesByCurrency(currency);

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
      <h1 className="mb-4">Countries using {currency} currency</h1>
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

export default CountriesByCurrency;
