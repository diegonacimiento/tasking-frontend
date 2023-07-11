import React from "react";
import TasksList from "../tasks/tasks-components/tasksList/TasksList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Modal from "../../../Modal";
import NewTask from "./tasks-components/newTask/NewTask";
import SearchTasks from "./tasks-components/searchTasks/SearchTasks";
import { TiPlus } from "react-icons/ti";
import "./tasks.css";

export default function Tasks() {
  const modal = document.getElementById("modal");

  const modalOn = () => {
    modal.setAttribute("style", "display:flex");
  };

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "max-content");
  style.setProperty("--minHeightRoot", "100vh");

  return (
    <>
      <Header ban={true} />

      <main className="main-tasks">
        <Modal>
          <NewTask />
        </Modal>

        <SearchTasks />

        <div className="task-list-container">
          <TasksList />
        </div>

        <p id="error"></p>

        <button className="button-add-task" onClick={modalOn}>
          {" "}
          <TiPlus />{" "}
        </button>
      </main>

      <Footer />
    </>
  );
}
