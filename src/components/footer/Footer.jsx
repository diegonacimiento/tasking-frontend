import "./footer.css";
import { BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <div id="footer">
        <a
          target={"_blank"}
          className="ig"
          href="https://www.instagram.com/diegonacimiento/?hl=es"
        >
          {<BsInstagram id="ig-svg" />} <h6 id="footer-h6">Diego Nacimiento</h6>
        </a>
      </div>
    </>
  );
}
