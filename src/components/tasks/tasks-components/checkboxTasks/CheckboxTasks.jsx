import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import "./checkboxTasks.css";

const CheckboxTasks = ({ tasks, setFilteredTasks }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isChecked, setIsChecked] = useState("Todos");
  const [allTasks, setAllTasks] = useState(null);

  useEffect(() => {
      setAllTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if(allTasks) filterTasks(isChecked);
  }, [allTasks]);

  const containerCheckbox = useRef(null);

  const handleFilter = () => {
    setIsOpenFilter((prev) => !prev);
    isOpenFilter
      ? containerCheckbox.current.removeAttribute("style")
      : containerCheckbox.current.setAttribute("style", "max-height: 150px;");
  };

  const handleChangeOption = (event) => {
    setIsChecked(event.target.value);
    localStorage.setItem("filter", JSON.stringify(event.target.value));
    filterTasks(event.target.value);
  };

  const filterTasks = (option) => {
    const tasksCompleted = allTasks.filter((task) => task.isComplete === true);
    const tasksPending = allTasks.filter((task) => task.isComplete === false);
    if (option === "Todos") {
      setFilteredTasks(allTasks);
    } else if (option === "Pendientes") {
      tasksPending.length === 0 && tasksPending.push(option);
      setFilteredTasks(tasksPending);
    } else {
      tasksCompleted.length === 0 && tasksCompleted.push(option);
      setFilteredTasks(tasksCompleted);
    }
  };

  return (
    <>
      <div className="container-button-filter">
        <button
          title={isOpenFilter ? "Cerrar filtros" : "Abrir filtros"}
          type="button"
          id="bt-filter"
          className="button"
          onClick={handleFilter}
        >
          <AiOutlineSetting /> Filtrar
        </button>
      </div>
      <div className="container-checkbox" ref={containerCheckbox}>
        <span>
          <input
            type="radio"
            name="all"
            value="Todos"
            onChange={handleChangeOption}
            checked={isChecked === "Todos"}
          />
          <label>Todos</label>
        </span>
        <span>
          <input
            type="radio"
            name="pending"
            value="Pendientes"
            onChange={handleChangeOption}
            checked={isChecked === "Pendientes"}
          />
          <label>Pendientes</label>
        </span>
        <span>
          <input
            type="radio"
            name="complete"
            value="Completadas"
            onChange={handleChangeOption}
            checked={isChecked === "Completadas"}
          />
          <label>Completadas</label>
        </span>
      </div>
    </>
  );
};

export default CheckboxTasks;
