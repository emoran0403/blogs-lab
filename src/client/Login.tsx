import React, { useState } from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Validation from "./Client_Utils/DataValidation";
import Fetcher from "./Client_Utils/Fetcher";
import { TOKEN_KEY } from "../client/Client_Utils/Fetcher";

const Loginpage = () => {
  const nav = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Validation.isValidEmail(email)
      .then(() => console.log(`Validation Complete.`))
      .catch((error) => {
        console.log(`Bad Email Check Error...\n`);
        console.error(error);
        alert("Please check your credentials");
        return;
      });

    Fetcher.POST("/auth/login", { email, password })
      .then((data) => {
        console.log({ data });
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
          nav(`/blogs`);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log(`Login Error...\n`);
        console.error(error);
        alert(`Something went wrong, please try again`);
      });

    //!gotta make this work lol
    // if (username === "Ervin Howell") {
    //   const secretTrackz = new Audio(`../secretTrack.mp3`);
    //   secretTrackz.play();
    // }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please log in, or click the new user button</h5>

            <input
              id="email"
              placeholder="email"
              type="email"
              value={email}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="password"
              placeholder="password"
              type="text"
              value={password}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleLogin(e)}>
              Login
            </Button>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => nav("/newauthor")}>
              I am a new Author
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
