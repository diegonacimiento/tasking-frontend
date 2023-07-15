import React, { useContext } from "react";
import { Context } from "../../../../context/Context";
import tasksService from "../../../../services/tasks.service";
import "./newTask.css";
import Loading from "../../../loading/Loading";

const service = new tasksService();

export default function NewTask({ tasks, setTasks, setLoading, foundError }) {
  const { token } = useContext(Context);

  const copyTasks = tasks;

  const modal = document.getElementById("modal");

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("error").textContent = "";
    const task = document.querySelector(".task-input-create").value.toLowerCase();
    if(!task) return;
    postTask(task);
    setTasks([...tasks, {description: <Loading />}]);
    // setLoading(true);
    modalNone();
  }

  const modalNone = () => {
    document.querySelector(".task-input-create").value = "";
    modal.setAttribute("style", "display:none");
  };

  async function postTask(task) {
    try {
      const newTask = await service.create(task, token);
      setTasks([...tasks, newTask.data.newTask]);
      foundError("")
    } catch (error) {
      setTasks(copyTasks);
      foundError("Ocurrió un problema.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-task">
      <input
        placeholder="Escribe una tarea"
        type={"text"}
        className={"task-input-create"}
      />
      <div className="button-contain">
        <button title="Cancelar" onClick={modalNone} className={`button bt-newTask`}>
          Cancelar
        </button>
        <button title="Crear" className={`button bt-newTask`}>
          Crear
        </button>
      </div>
    </form>
  );
}
