import React, { useReducer, useMemo } from "react";
import { useCountries } from "../hooks/useCountries";
import CountryCard from "../components/CountryCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Initial state for filters
const initialState = {
  search: "",
  searchType: "name", // name or capital
  region: "",
  subregion: "",
};

// Reducer function for filter/search state
function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, region: "", subregion: "" };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };
    case "SET_REGION":
      return { ...state, region: action.payload, subregion: "", search: "" };
    case "SET_SUBREGION":
      return { ...state, subregion: action.payload, region: "", search: "" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled(motion.h1)`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #34495e;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

const NavLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #2ecc71;
  }
`;

const FilterSection = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  }
`;

const CountryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const LoadingState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  color: #3498db;
  font-size: 1.5rem;
`;

const ErrorState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  color: #e74c3c;
  font-size: 1.5rem;
`;

const CountryList = () => {
  const { user, logout } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all countries once
  const { data: countries = [], isLoading, isError } = useCountries();

  const filteredCountries = useMemo(() => {
    if (isLoading) return [];

    // First filter by region/subregion if specified
    let result = countries;

    if (state.region) {
      result = result.filter(
        (country) => country.region.toLowerCase() === state.region.toLowerCase()
      );
    }

    if (state.subregion) {
      result = result.filter(
        (country) =>
          country.subregion?.toLowerCase() === state.subregion.toLowerCase()
      );
    }

    // Then filter by search term if specified
    if (state.search) {
      const searchTerm = state.search.toLowerCase();
      result = result.filter((country) => {
        if (state.searchType === "name") {
          return country.name.common.toLowerCase().includes(searchTerm);
        } else {
          // capital
          return country.capital?.some((cap) =>
            cap.toLowerCase().includes(searchTerm)
          );
        }
      });
    }

    return result;
  }, [countries, state, isLoading]);

  // Only show loading on initial load
  if (isLoading && countries.length === 0) {
    return (
      <Container>
        <LoadingState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading countries...
        </LoadingState>
      </Container>
    );
  }

  if (isError) {
    toast.error("Failed to fetch countries.");
    return (
      <Container>
        <ErrorState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Error loading countries.
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Explore the World
      </Header>

      {user && (
        <UserBar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div>Welcome, {user.email} Find Your Next Travel Destination</div>
        </UserBar>
      )}

      <FilterSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <FilterRow>
          <Select
            value={state.searchType}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH_TYPE", payload: e.target.value })
            }
          >
            <option value="name">Search by Name</option>
            <option value="capital">Search by Capital</option>
          </Select>
          <Input
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
            placeholder={`Search by ${state.searchType}`}
          />
        </FilterRow>

        <FilterRow>
          <Select
            onChange={(e) =>
              dispatch({ type: "SET_REGION", payload: e.target.value })
            }
            value={state.region}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </Select>

          <Select
            onChange={(e) =>
              dispatch({ type: "SET_SUBREGION", payload: e.target.value })
            }
            value={state.subregion}
          >
            <option value="">Filter by Subregion</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="South America">South America</option>
            <option value="Eastern Africa">Eastern Africa</option>
          </Select>
        </FilterRow>
      </FilterSection>

      <AnimatePresence>
        {filteredCountries.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No countries found. Try adjusting your filters.
          </EmptyState>
        ) : (
          <CountryGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredCountries.map((country) => (
                <motion.div
                  key={country.cca3}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CountryCard country={country} />
                </motion.div>
              ))}
            </AnimatePresence>
          </CountryGrid>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CountryList;
