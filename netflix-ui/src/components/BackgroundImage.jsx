import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover; /* Ensures the image covers the screen without distorting */
    object-position: center; /* Ensures the image is centered */
  }

  /* Media query for smaller devices (max-width: 768px) */
  @media (max-width: 768px) {
    img {
      object-position: center; /* Keeps image centered for tablets */
    }
  }

  /* Media query for mobile devices (max-width: 480px) */
  @media (max-width: 480px) {
    img {
      object-position: center; /* Ensures the image is always centered on mobile */
    }
  }
`;
