import React, { useContext } from "react";
import { Context } from "../../../../context/Context";
import "./searchTasks.css";

export default function SearchTasks() {
  const { searchTask } = useContext(Context);

  function search(e) {
    searchTask(e.target.value.toLowerCase());
  }

  return (
    <div className="search-tasks-div">
      <input onChange={search} placeholder="Buscar" type={"text"} />
    </div>
  );
}
