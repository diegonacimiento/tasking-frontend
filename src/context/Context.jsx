import { createContext, useState, useEffect } from "react";
import tasksService from "../services/tasks.service";

const service = new tasksService();

export const Context = createContext();

localStorage.setItem("stateMenu", "true");

export function ContextProvider(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const [stateMenu, setStateMenu] = useState(localStorage.getItem("stateMenu"));

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [tasks, setTasks] = useState();

  const [realTasks, setRealTasks] = useState();

  const [taskId, setTaskId] = useState(0);

  const [search, setSearch] = useState();

  useEffect(() => {
    const taskId = service.searchUser(token);
    const tasks = service.searchAll(token);
    taskId.then(res => setTaskId(res.data.taskId)).catch(e => console.log(e));
    tasks.then(res => setTasks([...res.data])).catch((e) => console.log(e));
    tasks.then(res => setRealTasks([...res.data])).catch((e) => console.log(e));
  }, []);

  function searchTask(text) {
    const response = tasks.filter(task => {
      setSearch(null);
      return task.description.includes(text);
    });
    (response.length > 0) ? setTasks([...response]) : setSearch("NF");
    if(text == "") {
      setTasks([...realTasks]);
      setSearch(null);
    };
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
      ? (localStorage.setItem("stateMenu", "true"), setStateMenu("true"))
      : (localStorage.setItem("stateMenu", "false"), setStateMenu("false"));
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
        realTasks,
        setRealTasks,
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
