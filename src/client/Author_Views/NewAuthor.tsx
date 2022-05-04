import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Client_Utils/DataValidation";
import * as Types from "../../types";
const HIBPCheck = require("@atlc/hibp");

const NewAuthor = () => {
  const [authorname, setAuthorname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authorbio, setAuthorBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();

  //! make this work today lol
  const handleNewAuthorLogin = () => {
    // call HIBP to check if the password is good
    const passcheck = HIBPCheck(password) as Types.HIBPResponse; // for that sweet autocomplete
    // passcheck.isPwned is true if bad pass, false if good pass
    if (passcheck.isPwned) {
      // if password is crap, execute this if block
      alert(`Hey, ${password} is a bad password, it has been revealed in ${passcheck.breaches} database breaches`);
    } else {
      // if password is good, execute this else block, continuing further validation
      Validation.isValidString([authorname, email, authorbio])
        .then(() =>
          Validation.isValidStringLength([
            [authorname, 45],
            [email, 45],
            [authorbio, 500],
          ])
        )
        .then(() => Validation.isValidEmail(email))
        .then(() => console.log(`Validation complete.`))
        .catch((error) => {
          console.log(`New Author Input Validation Error...\n`);
          console.error(error);
          alert("Please check your data");
          return;
        });

      fetch("/api/users/", {
        // use the route:  /api/chirps/ ...
        method: "POST", // ...send a POST request...
        headers: {
          // ...specifying the type of content...
          "content-type": "application/json",
        },
        body: JSON.stringify({ authorname, authorbio, email, password }), // ...and deliver the content
      })
        .then((res) => {
          // then with that response
          res.json().then((data) => {
            // parse as JSON data, then with that data
            if (res.ok) {
              // if there was an OK response
              console.log(`New Author Added!`);
              nav(`/blogs`); // navigate user to blogs
            } else {
              // if there was not an OK response
              throw new Error(data.message); // throw a new error
            }
          });
        })
        .catch((error) => {
          console.log(`New Author Error...\n`);
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please enter your information below</h5>

            <input
              placeholder="Author Name (username)"
              type="text"
              value={authorname}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setAuthorname(e.target.value)}
            />

            <input
              placeholder="Email"
              type="email"
              value={email}
              className="form-control col-md-7 my-1"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              className="form-control col-md-7 my-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            <textarea
              placeholder="Tell us about yourself."
              value={authorbio}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setAuthorBio(e.target.value)}
            ></textarea>

            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => handleNewAuthorLogin()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuthor;
