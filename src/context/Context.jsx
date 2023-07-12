import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tasksService from "../services/tasks.service";

const service = new tasksService();

export const Context = createContext();

localStorage.setItem("stateMenu", "true");

export function ContextProvider(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const navigate = useNavigate();

  if (!mode) {
    localStorage.setItem("mode", "light");
    setMode(localStorage.getItem("mode"));
  }

  const [stateMenu, setStateMenu] = useState(localStorage.getItem("stateMenu"));

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [tasks, setTasks] = useState();

  const [taskId, setTaskId] = useState(0);

  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (token) {
      const taskId = service.searchUser(token);
      const tasks = service.searchAll(token);
      taskId
        .then((res) => setTaskId(res.data.taskId));
      tasks.then((res) => setTasks([...res.data])).catch(() => setTasks(["Error server"]));
    }
  }, [token]);

  function searchTask(text) {
    const response = tasks.filter((task) => {
      setSearch(null);
      if(task == "Error server") return task;
      return task.description.includes(text);
    });
    if(response == "Error server") return setSearch(response);
    response.length > 0 ? setSearch([...response]) : setSearch("NF");
    if (text == "") {
      setTasks([...tasks]);
      setSearch(null);
    }
  }

  const style = document.documentElement.style;

  function interfaceMode(mode) {
    if (mode == "dark") {
      style.setProperty("--colorRoot", "rgb(34, 34, 34)");
      style.setProperty("--colorBorder", "rgb(104, 104, 104)");
      style.setProperty("--colorBotton", "rgb(255, 255, 255)");
      style.setProperty("--bkButton", "#343434");
      style.setProperty("--loading-top", "#bde0fe");
    } else {
      style.setProperty("--colorRoot", "rgb(230, 230, 230)");
      style.setProperty("--colorBorder", "rgb(104, 104, 104)");
      style.setProperty("--colorBotton", "rgb(0, 0, 0)");
      style.setProperty("--bkButton", "#adb5bd");
      style.setProperty("--loading-top", "#03045e");
    }
  }

  interfaceMode(mode);

  function changeMode() {
    mode == "light"
      ? (localStorage.setItem("mode", "dark"),
        setMode("dark"),
        interfaceMode("dark"))
      : (localStorage.setItem("mode", "light"),
        setMode("light"),
        interfaceMode("light"));
  }

  function menuNone() {
    stateMenu == "false"
      ? (localStorage.setItem("stateMenu", "true"), setStateMenu("true"))
      : (localStorage.setItem("stateMenu", "false"), setStateMenu("false"));
  }

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

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  }

  return (
    <Context.Provider
      value={{
        tasks,
        mode,
        stateMenu,
        token,
        taskId,
        search,
        modeViewPass,
        modeViewNP,
        modeViewCNP,
        emailValidation,
        passwordValidation,
        viewPassword,
        viewPasswordNP,
        viewPasswordCNP,
        setSearch,
        setTaskId,
        setTasks,
        setToken,
        changeMode,
        menuNone,
        searchTask,
        logout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
