import React from "react";
import Loading from "../../../loading/Loading";
import TasksCard from "../tasksCard/TasksCard";
import "./tasksList.css";

export default function TasksList({ tasks, setTasks, resultSearch, showError }) {

  const sortTasks = (a, b) => a.id - b.id;

  if (resultSearch === undefined) return <h2>No hubo resultados en su búsqueda</h2>;

  if (!tasks)
    return (
      <div className="loading-taskList">
        <Loading className={"load-contain"} />
      </div>
    );

  if (tasks.length === 0) return <h2>No hay tareas</h2>;

  const render = resultSearch || tasks;

  return [...render].sort(sortTasks).map((task, i) => (
    <div className="task-list-div" key={i}>
      <TasksCard task={task} tasks={tasks} setTasks={setTasks} showError={showError} />
    </div>
  ));
}
