import React from "react";
import "./footer.css";
import { BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <footer>
        <a
          target={"_blank"}
          className="link-ig"
          href="https://www.instagram.com/diegonacimiento/?hl=es" rel="noreferrer"
        >
          {<BsInstagram className="logo" />} <p className="texto">Diego Nacimiento</p>
        </a>
      </footer>
    </>
  );
}
