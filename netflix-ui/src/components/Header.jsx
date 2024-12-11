import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  padding: 0 4rem;

  .logo {
    img {
      height: 5rem;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }

  /* Media query for tablets and smaller devices (max-width: 768px) */
  @media (max-width: 768px) {
    padding: 0 2rem;

    .logo {
      img {
        height: 4rem; /* Smaller logo for tablet screens */
      }
    }

    button {
      padding: 0.4rem 0.8rem; /* Adjust button padding */
      font-size: 0.95rem; /* Slightly smaller font size for buttons */
    }
  }

  /* Media query for mobile devices (max-width: 480px) */
  @media (max-width: 480px) {
    padding: 0 1rem;

    .logo {
      img {
        height: 3.5rem; /* Even smaller logo for mobile screens */
      }
    }

    button {
      padding: 0.3rem 0.6rem; /* Adjust button padding */
      font-size: 0.85rem; /* Smaller font size for mobile */
    }
  }
`;
