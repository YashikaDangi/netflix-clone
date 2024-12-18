import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
  
    if (!email || !password) {
      console.log("Please fill in both email and password");
      return;
    }
  
    axios.post("http://localhost:5000/api/user/signup", { email, password })
      .then(result => {
        console.log("Signup successful:", result);
        navigate('/');
      })
      .catch(err => {
        console.error("Signup error:", err);
      });
  };
  

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  email: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    password: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignUp}>Sign Up</button>}
        </div>
      </div>
    </Container>
  );
}



const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 2rem;
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 80%;
        max-width: 600px;

        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
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
    }
  }

  @media (max-width: 768px) {
    .content {
      .body {
        .text {
          font-size: 1.5rem;

          h1 {
            padding: 0 1rem;
          }
        }

        .form {
          width: 90%;
          grid-template-columns: 1fr;
          gap: 1rem;

          input {
            padding: 1rem;
            font-size: 1rem;
          }

          button {
            font-size: 1rem;
          }
        }

        button {
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .content {
      .body {
        .text {
          font-size: 1.2rem;

          h1 {
            padding: 0;
          }
        }

        .form {
          width: 100%;
          input {
            padding: 0.8rem;
            font-size: 0.9rem;
          }

          button {
            font-size: 0.9rem;
          }
        }

        button {
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export default Signup;
