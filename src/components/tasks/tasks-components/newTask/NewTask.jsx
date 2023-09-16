import React, { useContext } from "react";
import { Context } from "../../../../context/Context";
import tasksService from "../../../../services/tasks.service";
import "./newTask.css";

const modal = document.getElementById("modal");
const root = document.getElementById("root");
const service = new tasksService();

export default function NewTask({ tasks, setTasks, showError, newTaskInput }) {
  const { token } = useContext(Context);


  const copyTasks = tasks;

  const handleSubmit = (e) => {
    e.preventDefault();
    showError("");
    const newTask = newTaskInput.current.value.toLowerCase();
    if (!newTask) return;
    postTask(newTask);
    setTasks([...tasks, { description: null }]);
    modalNone();
  };

  const modalNone = () => {
    newTaskInput.current.value = "";
    modal.setAttribute("style", "display:none");
    root.removeAttribute("style");
    updateScrollFocus();
  };

  const updateScrollFocus = () => {
    setTimeout(() => {
      const btAddTask = document.querySelector(".button-add-task");
      if (btAddTask) {
        btAddTask.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  async function postTask(task) {
    try {
      const newTask = await service.create(task, token);
      setTasks([...tasks, newTask.data.newTask]);
      showError("");
    } catch (error) {
      setTasks(copyTasks);
      showError("Ocurrió un error, intente de nuevo");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-task">
      <input placeholder="Escribe una tarea" type={"text"} ref={newTaskInput} />
      <div className="button-contain">
        <button
          title="Cancelar"
          onClick={modalNone}
          className={`button bt-newTask`}
          type="button"
        >
          Cancelar
        </button>
        <button title="Crear" className={`button bt-newTask`} type="submit">
          Crear
        </button>
      </div>
    </form>
  );
}
