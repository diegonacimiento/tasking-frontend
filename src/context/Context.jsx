import { createContext, useState, useEffect } from "react";
import tasksService from "../services/tasks.service";

const service = new tasksService();

export const Context = createContext();

localStorage.setItem("stateMenu", "true");

export function ContextProvider(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

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
        .then((res) => setTaskId(res.data.taskId))
        .catch((e) => console.log(e));
      tasks.then((res) => setTasks([...res.data])).catch((e) => console.log(e));
    }
  }, [token]);

  function searchTask(text) {
    const response = tasks.filter((task) => {
      setSearch(null);
      return task.description.includes(text);
    });
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
    } else {
      style.setProperty("--colorRoot", "rgb(230, 230, 230)");
      style.setProperty("--colorBorder", "rgb(104, 104, 104)");
      style.setProperty("--colorBotton", "rgb(0, 0, 0)");
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

    const emailValue = email.value;

    if (emailRegex.test(emailValue)) {
      document.getElementById("error").textContent = "";
      email.removeAttribute("style");
      return "valido";
    } else {
      document
        .getElementById("error")
        .setAttribute("style", "color: rgb(238, 16, 16)");
      document.getElementById("error").textContent = "Mail inválido";
      email.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
      return "invalido";
    }
  }

  function passwordValidation() {
    const newPassword = document.querySelector(".newPassword");
    const confirmNewPassword = document.querySelector(".confirmNewPassword");

    if (newPassword.value !== confirmNewPassword.value) {
      document
        .getElementById("error")
        .setAttribute("style", "color: rgb(238, 16, 16)");
      document.getElementById("error").textContent =
        "Las contraseñas no coinciden";
      newPassword.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
      confirmNewPassword.setAttribute(
        "style",
        "border: 1px solid rgb(238, 16, 16)"
      );
    } else if (
      newPassword.value.length &&
      confirmNewPassword.value.length < 6
    ) {
      document
        .getElementById("error")
        .setAttribute("style", "color: rgb(238, 16, 16)");
      newPassword.setAttribute("style", "border: 1px solid rgb(238, 16, 16)");
      confirmNewPassword.setAttribute(
        "style",
        "border: 1px solid rgb(238, 16, 16)"
      );

      document.getElementById("error").textContent = "Mínimo 6 carácteres.";
    } else {
      document.getElementById("error").textContent = "";
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
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
