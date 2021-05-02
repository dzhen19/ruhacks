import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import styles from "./home.module.scss";
import landing from "./landing.svg";
import "./home.css";

interface Props {}

export const Home: React.FC<Props> = () => {
  const history = useHistory();

  const nextPage = (e) => {
    history.push("/studio");
  };

  return (
    <div>
      <div className="section hero">
        <div className="container">
          <div
            className="row"
            style={{
              marginBottom: "5%",
            }}
          >
            <h4
              className="hero-heading"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              Moving can be hard, but space estimation is algorithmic
              <a
                className="button button-primary"
                onClick={nextPage}
                style={{ verticalAlign: "middle" }}
              >
                Try Box-it
              </a>
            </h4>
          </div>
          <div className="one-half column">
            <img src={landing} />
          </div>
        </div>
      </div>
    </div>
  );
};
