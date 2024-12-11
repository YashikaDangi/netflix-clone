import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;

    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }

    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  /* Media query for tablets and smaller devices (max-width: 768px) */
  @media (max-width: 768px) {
    .player {
      .back {
        padding: 1.5rem; /* Reduce padding for tablets */
        svg {
          font-size: 2.5rem; /* Smaller back button icon on tablets */
        }
      }
    }
  }

  /* Media query for mobile devices (max-width: 480px) */
  @media (max-width: 480px) {
    .player {
      .back {
        padding: 1rem; /* Further reduce padding for mobile */
        svg {
          font-size: 2rem; /* Smaller back button icon on mobile */
        }
      }

      video {
        object-fit: contain; /* Ensure the video fits better on mobile without cropping */
      }
    }
  }
`;
