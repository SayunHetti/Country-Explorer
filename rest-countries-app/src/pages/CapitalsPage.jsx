// src/pages/CapitalsPage.js
import React, { useState, useMemo } from "react";
import { Card, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAllCapitals from "../hooks/useAllCapitals";

const CapitalsPage = () => {
  // State for search term input
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch capitals data from the custom hook
  const { capitals, loading } = useAllCapitals();

  // Memoize the filtered capitals to avoid unnecessary recalculations
  // Only re-run when capitals or searchTerm changes
  const filteredCapitals = useMemo(() => {
    return capitals.filter(
      (capital) =>
        typeof capital === "string" &&
        capital.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
    );
  }, [capitals, searchTerm]);

  // Function to handle the change in search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm with the user input
  };

  // If the data is still loading, show a spinner
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
      <h1 className="mb-4">Capitals</h1>

      {/* Search Bar: allows users to search for a specific capital */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a capital..."
          value={searchTerm} // Controlled component with searchTerm as value
          onChange={handleSearchChange} // Update searchTerm on input change
        />
      </Form.Group>

      {/* Display the list of filtered capitals in a responsive grid */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {/* If filteredCapitals is not empty, display them as Cards */}
        {filteredCapitals.length > 0 ? (
          filteredCapitals.map((capital) => (
            <Col key={capital}>
              <Card
                as={Link} // Makes the card clickable, navigating to a specific route
                to={`/countries-by-capital/${encodeURIComponent(capital)}`} // Encode capital in the URL
                className="h-100 text-decoration-none"
              >
                <Card.Body className="text-center">
                  <Card.Title>{capital}</Card.Title> {/* Capital name */}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          // If no capitals match the search term, display a message
          <Col className="text-center">
            <p>No capitals found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CapitalsPage;
