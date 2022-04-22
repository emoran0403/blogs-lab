import React, { useState } from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AuthorContact = (props: Types.AuthorContactProps) => {
  const [from, setFrom] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const nav = useNavigate();

  const clearEmailForm = () => {
    setFrom("");
    setSubject("");
    setMessage("");
  };

  const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("/contact", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ from, subject, message }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(`Your email to ${props.authorToContact} has been sent!`);
        clearEmailForm();
        props.navToAuthors();
        console.log(result);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Emailing {props.authorToContact}</h5>
            <input id="emailFrom" placeholder="Enter your email here" type="text" value={from} className="form-control col-md-7 mb-1" onChange={(e) => setFrom(e.target.value)} />
            <input id="emailSubject" placeholder="Subject" type="text" value={subject} className="form-control col-md-7 mt-1" onChange={(e) => setSubject(e.target.value)} />
            <textarea placeholder="Your message here" value={message} className="form-control col-md-7 mt-1" onChange={(e) => setMessage(e.target.value)}></textarea>
            <Button variant="contained" className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleSendEmail(e)}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorContact;