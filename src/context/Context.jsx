import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [modeViewPass, setModeViewPass] = useState("invisible");
  const [modeViewNP, setModeViewNP] = useState("invisible");
  const [modeViewCNP, setModeViewCNP] = useState("invisible");

  function emailValidation() {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const email = document.querySelector(".email");
    const error = document.querySelector(".e-mail");
    const spanError = document.querySelector(".span-mail");

    const emailValue = email.value;

    if (emailRegex.test(emailValue)) {
      error.textContent = "";
      email.removeAttribute("style");
      if(spanError) spanError.removeAttribute("style");
      return "valido";
    } else {
      error.setAttribute("style", "color: rgb(238, 16, 16)");
      error.textContent = "Email inválido.";
      if(spanError) spanError.setAttribute("style", "color: rgb(238, 16, 16)");
      email.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
      return "invalido";
    }
  }

  function passwordValidation() {
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");
    const error = document.querySelector(".e-pass");
    const error2 = document.querySelector(".e-con-pass");
    const spanError = document.querySelector(".span-pass");
    const spanError2 = document.querySelector(".span-con-pass");

    error.textContent = "";
    error2.textContent = "";
    spanError.removeAttribute("style");
    spanError2.removeAttribute("style");
    newPassword.removeAttribute("style");
    confirmNewPassword.removeAttribute("style");

    if (newPassword.value.length < 6) {
      error.setAttribute("style", "color: rgb(238, 16, 16)");
      error.textContent = "Mínimo 6 carácteres.";
      spanError.setAttribute("style", "color: rgb(238, 16, 16)");
      newPassword.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
    } else if (newPassword.value !== confirmNewPassword.value) {
      error2.setAttribute("style", "color: rgb(238, 16, 16)");
      error2.textContent = "La contraseña no coincide.";
      spanError2.setAttribute("style", "color: rgb(238, 16, 16)");
      confirmNewPassword.setAttribute(
        "style",
        "border: 1px solid rgb(238, 16, 16)"
      );
    } else {
      error.textContent = "";
      error2.textContent = "";
      spanError.removeAttribute("style");
      spanError2.removeAttribute("style");
      newPassword.removeAttribute("style");
      confirmNewPassword.removeAttribute("style");
    }
  }

  function viewPassword() {
    const password = document.querySelector(".password");

    if (password.type == "password") {
      password.type = "text";
      setModeViewPass("visible");
    } else {
      password.type = "password";
      setModeViewPass("invisible");
    }
  }

  function viewPasswordNP() {
    const newPassword = document.querySelector(".newPassword");

    if (newPassword.type == "password") {
      newPassword.type = "text";
      setModeViewNP("visible");
    } else {
      newPassword.type = "password";
      setModeViewNP("invisible");
    }
  }

  function viewPasswordCNP() {
    const confirmNewPassword = document.querySelector(".confirmNewPassword");

    if (confirmNewPassword.type == "password") {
      confirmNewPassword.type = "text";
      setModeViewCNP("visible");
    } else {
      confirmNewPassword.type = "password";
      setModeViewCNP("invisible");
    }
  }

  return (
    <Context.Provider
      value={{
        token,
        modeViewPass,
        modeViewNP,
        modeViewCNP,
        emailValidation,
        passwordValidation,
        viewPassword,
        viewPasswordNP,
        viewPasswordCNP,
        setToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
