import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(undefined);

  // Replace Firebase auth with localStorage check (or JWT validation)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("email"); // Check if email is stored in localStorage
    if (loggedInUser) {
      setUser(loggedInUser); // User is logged in
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded, genres, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;

    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }

  /* Media query for tablets and smaller screens (max-width: 768px) */
  @media (max-width: 768px) {
    .data {
      margin-top: 6rem;

      .not-available {
        margin-top: 3rem;
        font-size: 1.5rem;
      }
    }
  }

  /* Media query for mobile screens (max-width: 480px) */
  @media (max-width: 480px) {
    .data {
      margin-top: 4rem;

      .not-available {
        margin-top: 2rem;
        font-size: 1.2rem;
      }
    }
  }
`;

export default MoviePage;
