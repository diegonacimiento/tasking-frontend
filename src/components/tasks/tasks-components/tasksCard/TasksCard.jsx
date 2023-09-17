import React, { useContext, useEffect, useState } from "react";
import { VscClose, VscCheck } from "react-icons/vsc";
import { capitalizeString } from "../../../../utils/dataUtils";
import { Context } from "../../../../context/Context";
import Loading from "../../../loading/Loading";
import tasksService from "../../../../services/tasks.service";
import "./tasksCard.css";

const service = new tasksService();

export default function TasksCard({ task, tasks, setTasks, showError }) {
  const { token } = useContext(Context);
  const [isComplete, setIsComplete] = useState(task.isComplete);

  useEffect(() => {
    setIsComplete(task.isComplete);
  }, [task])

  async function handleComplete() {
    try {
      setIsComplete((prevState) => !prevState);
      const body = { isComplete: !task.isComplete };
      await service.update(body, task.id, token);
      const copyTask = tasks;
      const updateTask = copyTask.filter((t) => t.id === task.id);
      updateTask[0].isComplete = body.isComplete;
      setTasks([...copyTask]);
    } catch (e) {
      showError("Ocurrió un error, intente de nuevo");
    }
  }

  async function handleDelete() {
    try {
      const newTasksList = tasks.filter((taskOld) => taskOld.id != task.id);
      setTasks([...newTasksList]);
      await service.delete(task.id, token);
    } catch (e) {
      showError("Ocurrió un error, intente de nuevo");
    }
  }

  return task.description ? (
    <div className={isComplete ? "task-card-div complete" : "task-card-div"}>
      <button onClick={handleDelete}>
        <VscClose />
      </button>

      <p className={`task-p`}>{capitalizeString(task.description)}</p>

      <button onClick={handleComplete}>
        <VscCheck />
      </button>
    </div>
  ) : (
    <Loading />
  );
}
