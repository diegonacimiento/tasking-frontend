import { useContext } from "react";
import { Context } from "../../../../context/Context";
import TasksCard from "../tasksCard/TasksCard";
import "./tasksList.css";

export default function TasksList() {
  const { tasks } = useContext(Context);

  if(!tasks) return <h2>No hay tareas.</h2>

  return tasks.map((task, i) => (
    <div className="task-list-div" key={i}>
      <TasksCard task={task} />
    </div>
  ));
}
