import React from "react";
import "./searchTasks.css";
import { useContext } from "react";
import { Context } from "../../../../context/Context";

export default function SearchTasks() {
  const { searchTask } = useContext(Context);

  function search(e) {
    searchTask(e.target.value);
  }

  return (
    <div className="search-tasks-div">
      <input onChange={search} placeholder="Buscar" type={"text"} />
    </div>
  );
}
