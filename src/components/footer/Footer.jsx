import React from "react";
import { BsLinkedin } from "react-icons/bs";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <a
        target={"_blank"}
        className="link-ig"
        href="https://www.linkedin.com/in/diego-nacimiento-01b2b025a"
        rel="noreferrer"
      >
        <div>{<BsLinkedin className="logo" />}</div>
        <p className="texto">Diego Nacimiento</p>
      </a>
    </footer>
  );
}
