import "./newTask.css";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import tasksService from "../../../../services/tasks.service";

const service = new tasksService();

export default function NewTask() {
  const {
    mode,
    token,
    tasks,
    setTasks,
    taskId,
    setTaskId,
    realTasks,
    setRealTasks,
  } = useContext(Context);

  const modal = document.getElementById("modal");

  const submitOff = (e) => e.preventDefault();

  const modalNone = () => {
    document.querySelector(".task-input-create").value = "";
    modal.setAttribute("style", "display:none");
  };

  function postTask() {
    document.getElementById("error").textContent = "";
    const task = document.querySelector(".task-input-create").value;
    const id = taskId + 1;
    setTaskId(id);
    const body = { taskId: id };
    service.updateTaskId(body, token);
    const newTask = service.create(task, token);
    newTask
      .then((res) => {
        setTaskId(res.data.newTask.id);
      })
      .catch((e) => {
        console.log(e);
        document.getElementById("error").textContent = "Ocurrió un error";
      });
    setTasks([...tasks, { description: task, id, status: "pendiente" }]);
    setRealTasks([
      ...realTasks,
      { description: task, id, status: "pendiente" },
    ]);
    modalNone();
  }

  const style = document.documentElement.style;
  if (mode == "light") {
    style.setProperty("--bkModal", "rgba(0, 0, 0, 0.8)");
  } else style.setProperty("--bkModal", "rgba(0, 0, 0, 0.6)");

  return (
    <form onSubmit={submitOff} className="new-task">
      <input
        placeholder="Tarea"
        type={"text"}
        className={"task-input-create"}
      />
      <div className="button-contain">
        <button onClick={modalNone} className={`button`}>
          Cancelar
        </button>
        <button onClick={postTask} className={`button`}>
          Crear
        </button>
      </div>
    </form>
  );
}
