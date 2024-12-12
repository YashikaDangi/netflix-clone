// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import CardSlider from "../components/CardSlider";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
// import SelectGenre from "../components/SelectGenre";
// import Slider from "../components/Slider";

// function TVShows() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
//   const dataLoading = useSelector((state) => state.netflix.dataLoading);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!genres.length) dispatch(getGenres());
//   }, []);

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ genres, type: "tv" }));
//     }
//   }, [genresLoaded]);

//   const [user, setUser] = useState(undefined);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) setUser(currentUser.uid);
//     else navigate("/login");
//   });

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
//       <div className="data">
//         <SelectGenre genres={genres} type="tv" />
//         {movies.length ? (
//           <>
//             <Slider movies={movies} />
//           </>
//         ) : (
//           <h1 className="not-available">
//             No TV Shows avaialble for the selected genre. Please select a
//             different genre.
//           </h1>
//         )}
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   .data {
//     margin-top: 8rem;

//     .not-available {
//       text-align: center;
//       margin-top: 4rem;
//     }
//   }

//   /* Media query for tablets and smaller devices (max-width: 768px) */
//   @media (max-width: 768px) {
//     .data {
//       margin-top: 6rem; /* Adjust margin-top for smaller screens */
//     }

//     .not-available {
//       margin-top: 3rem; /* Adjust margin-top for smaller screens */
//     }
//   }

//   /* Media query for mobile devices (max-width: 480px) */
//   @media (max-width: 480px) {
//     .data {
//       margin-top: 4rem; /* Further reduce margin-top for mobile */
//     }

//     .not-available {
//       margin-top: 2rem; /* Further reduce margin-top for mobile */
//     }
//   }
// `;

// export default TVShows;
