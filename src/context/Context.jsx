import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {
    const [mode, setMode] = useState(localStorage.getItem("mode"));

    const style = document.documentElement.style;

    function interfaceMode(mode) {
        if (mode == "dark") {
            style.setProperty("--colorRoot", "rgb(34, 34, 34)");
            style.setProperty("--colorBorder", "rgb(104, 104, 104)");
            style.setProperty("--colorBotton", "rgb(255, 255, 255)");
          } else {
            style.setProperty("--colorRoot", "rgb(230, 230, 230)");
            style.setProperty("--colorBorder", "rgb(104, 104, 104)");
            style.setProperty("--colorBotton", "rgb(0, 0, 0)");
          };
    };

    interfaceMode(mode);

    function changeMode() {
        mode == "light" 
            ? (localStorage.setItem("mode", "dark"), setMode("dark"), interfaceMode("dark")) 
            : (localStorage.setItem("mode", "light"), setMode("light"), interfaceMode("light"))
    };

    return(
        <Context.Provider
            value={{
                mode,
                changeMode,
            }}>
            {props.children}
        </Context.Provider>
    );
};