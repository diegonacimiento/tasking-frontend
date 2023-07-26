import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {

  const [token, setToken] = useState(localStorage.getItem("token"));

  function emailValidation(emailValue) {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(emailValue)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        emailValidation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
