import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {
    const [mode, setMode] = useState(localStorage.getItem("mode"));

    function changeMode() {
        mode == "light" 
            ? (localStorage.setItem("mode", "dark"), setMode("dark")) 
            : (localStorage.setItem("mode", "light"), setMode("light"))
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