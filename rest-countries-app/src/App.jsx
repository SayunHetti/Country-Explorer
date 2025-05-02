import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

// Lazy-loaded pages
const CountryList = lazy(() => import("./pages/CountryList"));
const CountryDetail = lazy(() => import("./pages/CountryDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Profile = lazy(() => import("./pages/Profile"));
const LanguagesPage = lazy(() => import("./pages/LanguagesPage"));
const CurrenciesPage = lazy(() => import("./pages/CurrenciesPage"));
const CountriesByLanguage = lazy(() => import("./pages/CountriesByLanguage"));
const CountriesByCurrency = lazy(() => import("./pages/CountriesByCurrency"));
const CapitalsPage = lazy(() => import("./pages/CapitalsPage"));
const CountriesByCapital = lazy(() => import("./pages/CountriesByCapital"));

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        {/* Main Content */}
        <Container className="mb-5 flex-grow-1">
          <Suspense
            fallback={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomePage />} />

              <Route
                path="/Dashboard"
                element={
                  <PrivateRoute>
                    <CountryList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/country/:code"
                element={
                  <PrivateRoute>
                    <CountryDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/languages"
                element={
                  <PrivateRoute>
                    <LanguagesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/currencies"
                element={
                  <PrivateRoute>
                    <CurrenciesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/countries-by-language/:language"
                element={
                  <PrivateRoute>
                    <CountriesByLanguage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/countries-by-currency/:currency"
                element={
                  <PrivateRoute>
                    <CountriesByCurrency />
                  </PrivateRoute>
                }
              />
              <Route
                path="/capitals"
                element={
                  <PrivateRoute>
                    <CapitalsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/countries-by-capital/:capital"
                element={
                  <PrivateRoute>
                    <CountriesByCapital />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
