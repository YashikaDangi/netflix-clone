import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
import axios from "axios";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, genres, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="hero">
            <img
              src={backgroundImage}
              alt="background"
              className="background-image"
            />
            <div className="container">
              <div className="logo">
                <img src={MovieLogo} alt="Movie Logo" />
              </div>
              <div className="buttons flex">
                <button
                  onClick={() => navigate("/player")}
                  className="flex j-center a-center"
                >
                  <FaPlay />
                  Play
                </button>
                <button className="flex j-center a-center">
                  <AiOutlineInfoCircle />
                  More Info
                </button>
              </div>
            </div>
          </div>
          <Slider movies={movies} />
        </>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);
      height: 100vh; /* Full screen height for larger devices */
      width: 100vw;
      object-fit: cover; /* Ensures the image doesn't distort */
    }

    .container {
      position: absolute;
      bottom: 5rem; /* Default bottom spacing for desktop */
      left: 5rem;

      .logo {
        img {
          width: 70%; /* Scales the logo appropriately */
          height: auto; /* Maintains aspect ratio */
        }
      }

      .buttons {
        margin-top: 2rem;
        gap: 2rem;

        button {
          font-size: 1.4rem;
          gap: 1rem;
          padding: 0.6rem 2rem;
          border-radius: 0.2rem;
          cursor: pointer;

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }

  /* Tablet (max-width: 768px) */
  @media (max-width: 768px) {
    .hero {
      .background-image {
        height: 85vh; /* Slightly reduce height for tablets */
      }

      .container {
        bottom: 3rem; /* Adjust spacing for smaller devices */
        left: 3rem;

        .logo img {
          width: 60%; /* Scale logo size for tablets */
        }

        .buttons button {
          font-size: 1.2rem; /* Adjust button font size */
          padding: 0.4rem 1.5rem; /* Reduce padding */
        }
      }
    }
  }

  /* Mobile (max-width: 480px) */
  @media (max-width: 480px) {
    .hero {
      .background-image {
        height: 70vh; /* Reduce height for mobile to avoid extra space */
        width: 100%; /* Ensure full width coverage */
      }

      .container {
        bottom: 2rem; /* Further reduce bottom spacing */
        left: 1rem; /* Align the container closer to the edge */

        .logo img {
          width: 50%; /* Smaller logo size for mobile */
        }

        .buttons {
          margin-top: 1.5rem; /* Reduce margin between logo and buttons */
          gap: 1rem;

          button {
            font-size: 1rem; /* Smaller font size for buttons */
            padding: 0.3rem 1.2rem; /* Compact padding */
          }
        }
      }
    }
  }
`;


export default Netflix;
