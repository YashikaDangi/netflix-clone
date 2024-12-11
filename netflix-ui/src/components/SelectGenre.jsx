import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0.5rem;

  /* Media query for tablets and smaller devices (max-width: 768px) */
  @media (max-width: 768px) {
    margin-left: 2rem; /* Reduce the margin for tablets */
    font-size: 1.2rem; /* Smaller font size for tablets */
  }

  /* Media query for mobile devices (max-width: 480px) */
  @media (max-width: 480px) {
    margin-left: 1rem; /* Further reduce the margin for mobile */
    font-size: 1rem; /* Smaller font size for mobile */
    padding: 0.4rem; /* Reduce padding on mobile */
  }
`;
