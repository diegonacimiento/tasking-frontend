import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import CheckboxTasks from "./tasks-components/checkboxTasks/CheckboxTasks";
import TasksList from "../tasks/tasks-components/tasksList/TasksList";
import { Context } from "../../context/Context";
import Modal from "../../../Modal";
import NewTask from "./tasks-components/newTask/NewTask";
import SearchTasks from "./tasks-components/searchTasks/SearchTasks";
import tasksService from "../../services/tasks.service";
import "./tasks.css";

const service = new tasksService();

const modal = document.getElementById("modal");
const root = document.getElementById("root");

function Tasks() {
  const navigate = useNavigate();

  const error = useRef(null);
  const newTaskInput = useRef(null);

  const { token } = useContext(Context);

  const [tasks, setTasks] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [resultSearch, setResultSearch] = useState(null);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await service.searchAll(token);
        setTasks(response.data);
      } catch (error) {
        return navigate("/server-error");
      }
    }
    getTasks();
  }, []);

  function showError(msg) {
    error.current.textContent = msg;
  }

  function modalOn() {
    modal.setAttribute("style", "display:flex");
    root.setAttribute("style", "position: fixed");
    newTaskInput.current.focus();
    updateScrollFocus();
  }

  const updateScrollFocus = () => {
    const newTaskForm = document.querySelector(".new-task");
    setTimeout(() => {
      if (newTaskForm) {
        newTaskForm.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <main className="main-tasks">
      <Modal>
        <NewTask
          tasks={tasks}
          setTasks={setTasks}
          showError={showError}
          newTaskInput={newTaskInput}
        />
      </Modal>

      <SearchTasks
        tasks={filteredTasks ? filteredTasks : tasks}
        setResultSearch={setResultSearch}
      />

      <CheckboxTasks tasks={tasks} setFilteredTasks={setFilteredTasks} />

      <div className="task-list-container">
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          resultSearch={resultSearch}
          filteredTasks={filteredTasks}
          showError={showError}
        />
      </div>

      <p id="error" ref={error}></p>

      <button className="button-add-task" onClick={modalOn}>
        {" "}
        <TiPlus />{" "}
      </button>
    </main>
  );
}

export default Tasks;
