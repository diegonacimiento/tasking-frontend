import React, { useState } from "react";
import "./tasksCard.css";
import { VscClose, VscCheck } from "react-icons/vsc";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import tasksService from "../../../../services/tasks.service";
import { capitalizeString } from "../../../../utils/dataUtils";

const service = new tasksService();

export default function TasksCard({ task, tasks, setTasks }) {
  const { token } = useContext(Context);

  function statusTask() {
    if (task.status == "pendiente") {
      const body = { status: "completado" };
      service.update(body, task.id, token);
      const tasksAll = tasks;
      const taskUpdate = tasksAll.filter((taskUpdate) => {
        return taskUpdate.id == task.id;
      });
      taskUpdate[0].status = "completado";
      setTasks([...tasksAll]);
    } else if (task.status == "completado") {
      const body = { status: "pendiente" };
      service.update(body, task.id, token);
      const tasksAll = tasks;
      const taskUpdate = tasksAll.filter((taskUpdate) => {
        return taskUpdate.id == task.id;
      });
      taskUpdate[0].status = "pendiente";
      setTasks([...tasksAll]);
    }
  }

  function deleteTask() {
    service.delete(task.id, token);
    const newTasksList = tasks.filter((taskOld) => taskOld.id != task.id);
    setTasks([...newTasksList]);
  }

  let status = task.status == "completado" ? "completado" : "pendiente";

  return (
    typeof task.description === 'string' ? 
    <div className={`task-card-div ${status}`}>
      <button onClick={deleteTask}>
        <VscClose />
      </button>

      <p className={`task-p ${status}`}>{
        capitalizeString(task.description)
      }</p>

      <button onClick={statusTask}>
        <VscCheck />
      </button>
    </div>
    : task.description
  );
}
