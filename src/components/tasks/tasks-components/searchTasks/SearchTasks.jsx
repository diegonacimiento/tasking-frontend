import React from "react";
import "./searchTasks.css";

export default function SearchTasks({ tasks, setResultSearch }) {

  function searchTask(text) {
    const result = tasks.filter((task) => {
      return task.description.includes(text);
    });
    result.length > 0 ? setResultSearch([...result]) : setResultSearch(undefined);
    if (text === "") {
      setResultSearch(null);
    }
  }

  function search(e) {
    searchTask(e.target.value);
  }

  return (
    <div className="search-tasks-div">
      <input onChange={search} placeholder="Buscar" type={"text"} />
    </div>
  );
}
