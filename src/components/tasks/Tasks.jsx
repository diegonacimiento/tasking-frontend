import React, { useContext, useEffect, useRef, useState } from "react";
import TasksList from "../tasks/tasks-components/tasksList/TasksList";
import { TiPlus } from "react-icons/ti";
import { Context } from "../../context/Context";
import Modal from "../../../Modal";
import NewTask from "./tasks-components/newTask/NewTask";
import SearchTasks from "./tasks-components/searchTasks/SearchTasks";
import tasksService from "../../services/tasks.service";
import "./tasks.css";

const service = new tasksService();

export default function Tasks() {
  const modal = document.getElementById("modal");

  const error = useRef(null);

  const { token } = useContext(Context);

  const [tasks, setTasks] = useState(undefined);
  const [resultSearch, setResultSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  function foundError(msg) {
    error.current.textContent = msg;
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await service.searchAll(token);
        setTasks(response.data);
      } catch (error) {
        setTasks('Error server');
      }
    }
    getTasks();
  }, []);

  const modalOn = () => {
    modal.setAttribute("style", "display:flex");
  };

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "max-content");
  style.setProperty("--minHeightRoot", "100vh");

  return (
    <main className="main-tasks">
      <Modal>
        <NewTask tasks={tasks} setTasks={setTasks} setLoading={setLoading} foundError={foundError} />
      </Modal>

      <SearchTasks tasks={tasks} setResultSearch={setResultSearch} />

      <div className="task-list-container">
        <TasksList tasks={tasks} setTasks={setTasks} resultSearch={resultSearch} loading={loading} />
      </div>

      <p id="error" ref={error}></p>

      <button className="button-add-task" onClick={modalOn}>
        {" "}
        <TiPlus />{" "}
      </button>
    </main>
  );
}
