import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

localStorage.setItem("stateMenu", "true");

export function ContextProvider(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const [stateMenu, setStateMenu] = useState(localStorage.getItem("stateMenu"));

  const realTasks = axios("https://tasking-app.herokuapp.com/api/v1/tareas", {
    headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWVnb25hY2ltaWVudG8iLCJpYXQiOjE2Njc2MDE1OTN9.pynqIRFMpApcM164802buTqxUaQMF4R6WLWZzmpZqM0"}
  });

  const [tasks, setTasks] = useState([]);

  useEffect(function () {
    realTasks.then(res => setTasks([...res.data]));
  }, []);

  function createTask(task) {
    axios.post("https://tasking-app.herokuapp.com/api/v1/tareas/create", {
      task
    })
  };


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
      ? (localStorage.setItem("stateMenu", "true"),
        setStateMenu("true"))
      : (localStorage.setItem("stateMenu", "false"),
        setStateMenu("false")
        );
  }

  return (
    <Context.Provider
      value={{
        tasks,
        mode,
        stateMenu,
        changeMode,
        menuNone,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
