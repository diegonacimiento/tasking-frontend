import React from "react";
import Loading from "../../../loading/Loading";
import TasksCard from "../tasksCard/TasksCard";
import "./tasksList.css";

export default function TasksList({
  tasks,
  setTasks,
  resultSearch,
  filteredTasks,
  showError,
}) {
  const sortTasks = (a, b) => a.id - b.id;

  if (resultSearch === undefined)
    return <h2>No hubo resultados en su búsqueda</h2>;

  if (!tasks)
    return (
      <div className="loading-taskList">
        <Loading className={"load-contain"} />
      </div>
    );

  if (tasks.length === 0) return <h2>No hay tareas</h2>;
  
  if (filteredTasks && filteredTasks.includes("Pendientes")) return <h2>No hay tareas pendientes</h2>;
  else if (filteredTasks && filteredTasks.includes("Completadas")) return <h2>No hay tareas completadas</h2>

  const render = resultSearch || filteredTasks || tasks;

  return [...render].sort(sortTasks).map((task, i) => (
    <div className="task-list-div" key={i}>
      <TasksCard
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        showError={showError}
      />
    </div>
  ));
}
