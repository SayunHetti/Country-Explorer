import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCountryByCode } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { useFavorites } from "../hooks/useFavorites";
import toast from "react-hot-toast";

const Favorites = () => {
  const { user } = useAuth();
  const [favCountries, setFavCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getFavorites, removeFavorite } = useFavorites(user);

  useEffect(() => {
    if (!user) return;
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const codes = await getFavorites();
      const countryData = await Promise.all(
        codes.map((code) => getCountryByCode(code).then((res) => res.data[0]))
      );
      setFavCountries(countryData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (code) => {
    try {
      await removeFavorite(code);
      setFavCountries((prev) => prev.filter((c) => c.cca3 !== code));
      toast.success("Removed from favorites.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from favorites.");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-5">
        You must be logged in to view favorites.
      </p>
    );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading your favorites...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Favorites</h2>

      {favCountries.length === 0 ? (
        <p className="text-center">No favorites added yet.</p>
      ) : (
        <div className="row">
          {favCountries.map((country) => (
            <div key={country.cca3} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <CountryCard country={country} />
                  <div className="d-grid mt-3">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemove(country.cca3)}
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
