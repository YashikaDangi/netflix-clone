import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;

    h1 {
      margin-left: 3rem;
    }

    .grid {
      display: flex; /* Ensure the grid uses flexbox */
      flex-wrap: wrap;
      gap: 1rem;
    }
  }

  /* Media query for tablets and smaller devices (max-width: 768px) */
  @media (max-width: 768px) {
    .content {
      margin: 2rem;
      margin-top: 6rem; /* Adjust margin-top for smaller screens */
    }

    h1 {
      margin-left: 2rem; /* Reduce margin-left for smaller screens */
    }

    .grid {
      gap: 0.8rem; /* Reduce gap between items for smaller screens */
    }
  }

  /* Media query for mobile devices (max-width: 480px) */
  @media (max-width: 480px) {
    .content {
      margin: 1rem;
      margin-top: 4rem; /* Further reduce margin-top for mobile */
    }

    h1 {
      margin-left: 1rem; /* Further reduce margin-left for mobile */
    }

    .grid {
      gap: 0.5rem; /* Further reduce gap for mobile */
    }
  }
`;

