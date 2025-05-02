import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByCode } from "../api/countries";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaGlobe,
  FaCity,
  FaUsers,
  FaLanguage,
  FaStar,
  FaRegHeart,
} from "react-icons/fa";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { getFavorites, addFavorite, removeFavorite } = useFavorites(user);

  useEffect(() => {
    setIsLoading(true);
    getCountryByCode(code)
      .then((res) => {
        setCountry(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [code]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && country) {
        const favorites = await getFavorites();
        setIsFavorite(favorites.includes(country.cca3));
      }
    };
    checkFavoriteStatus();
  }, [user, country, getFavorites]);

  const toggleFavorite = async () => {
    if (!user || !country) return;

    try {
      if (isFavorite) {
        await removeFavorite(country.cca3);
        toast.success(`${country.name.common} removed from favorites.`);
      } else {
        await addFavorite(country.cca3);
        toast.success(`${country.name.common} added to favorites.`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error(
        `Failed to ${isFavorite ? "remove from" : "add to"} favorites.`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Country not found</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <FaGlobe className="me-2" />
                {country.name.common}
                {country.flag && (
                  <span className="ms-2 fs-4">{country.flag}</span>
                )}
              </h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5 mb-4 mb-md-0">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="img-fluid rounded shadow"
                  />
                  {user && (
                    <button
                      onClick={toggleFavorite}
                      className={`btn w-100 mt-3 ${
                        isFavorite ? "btn-danger" : "btn-outline-danger"
                      }`}
                    >
                      {isFavorite ? (
                        <>
                          <FaHeart className="me-2" />
                          Remove from Favorites
                        </>
                      ) : (
                        <>
                          <FaRegHeart className="me-2" />
                          Add to Favorites
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="col-md-7">
                  <div className="mb-3">
                    <h5 className="d-flex align-items-center">
                      <FaCity className="me-2 text-primary" />
                      <span>Capital</span>
                    </h5>
                    <p className="ms-4">{country.capital?.[0] || "N/A"}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="d-flex align-items-center">
                      <FaGlobe className="me-2 text-primary" />
                      <span>Region</span>
                    </h5>
                    <p className="ms-4">
                      {country.region}
                      {country.subregion && `, ${country.subregion}`}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="d-flex align-items-center">
                      <FaUsers className="me-2 text-primary" />
                      <span>Population</span>
                    </h5>
                    <p className="ms-4">
                      {country.population.toLocaleString()}
                    </p>
                  </div>

                  {country.languages && (
                    <div className="mb-3">
                      <h5 className="d-flex align-items-center">
                        <FaLanguage className="me-2 text-primary" />
                        <span>Languages</span>
                      </h5>
                      <p className="ms-4">
                        {Object.values(country.languages).join(", ")}
                      </p>
                    </div>
                  )}

                  {country.currencies && (
                    <div className="mb-3">
                      <h5 className="d-flex align-items-center">
                        <FaStar className="me-2 text-primary" />
                        <span>Currencies</span>
                      </h5>
                      <p className="ms-4">
                        {Object.values(country.currencies)
                          .map((c) => `${c.name} (${c.symbol || "—"})`)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
