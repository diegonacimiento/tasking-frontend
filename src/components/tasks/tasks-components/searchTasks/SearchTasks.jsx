import React, { useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import "./searchTasks.css";

export default function SearchTasks({ tasks, setResultSearch }) {
  const buttonDelete = useRef(null);
  const [valueInput, setValueInput] = useState("");

  function searchTask(text) {
    buttonDelete.current.style.display = "inline-block";
    const result = tasks.filter((task) => {
      return task.description.includes(text.toLowerCase());
    });
    result.length > 0 ? setResultSearch([...result]) : setResultSearch(undefined);
    if (!text) {
      setResultSearch(null);
      buttonDelete.current.style.display = "none";
      return;
    }
  }

  function search(e) {
    setValueInput(e.target.value);
    searchTask(e.target.value);
  }

  function deleteSearch() {
    setValueInput("");
    searchTask("");
  }

  return (
    <div className="search-tasks-div">
      <input onChange={search} placeholder="Buscar" type="text" value={valueInput} autoComplete="off" />
      <button title="Borrar búsqueda" onClick={deleteSearch} ref={buttonDelete}><VscClose /></button>
    </div>
  );
}
