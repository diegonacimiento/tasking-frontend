import { useContext } from "react";
import { Context } from "../../../../context/Context";
import TasksCard from "../tasksCard/TasksCard";
import "./tasksList.css";

export default function TasksList() {
  const { tasks, search } = useContext(Context);

  const sortTasks = (a, b) => a.id - b.id;

  let tasksList = [];

  if(search != null && search != "NF") { tasksList = search}
  else { tasksList = tasks};

  if(search == "NF") return <h2>No hubo resultados en su búsqueda.</h2>

  if(!tasksList) return <h2>Cargando...</h2>

  if(tasksList.length == 0) return <h2>No hay tareas.</h2>

  return [...tasksList].sort(sortTasks).map((task, i) => (
    <div className="task-list-div" key={i}>
      <TasksCard task={task} />
    </div>
  ));
}
