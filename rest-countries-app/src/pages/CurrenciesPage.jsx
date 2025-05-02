// src/pages/CurrenciesPage.js
import React, { useState, useMemo } from "react";
import { Card, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAllCurrencies from "../hooks/useAllCurrencies";

const CurrenciesPage = () => {
  const { currencies, loading } = useAllCurrencies();
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the filtered currencies based on the search term
  const filteredCurrencies = useMemo(() => {
    return currencies.filter((currency) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currencies, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Currencies</h1>
      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a currency..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredCurrencies.length > 0 ? (
          filteredCurrencies.map((currency) => (
            <Col key={currency}>
              <Card
                as={Link}
                to={`/countries-by-currency/${currency}`}
                className="h-100 text-decoration-none"
              >
                <Card.Body className="text-center">
                  <Card.Title>{currency}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No currencies found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CurrenciesPage;
