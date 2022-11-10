import ReactDOM from "react-dom";

function Menu({ children }) {
  return ReactDOM.createPortal(
        children,
        document.getElementById("menu-bar")
  );
}

export default Menu;