import "./newTask.css";

export default function NewTask() {

  const modal = document.getElementById("modal");

  const submitOff = (e) => e.preventDefault();

  const modalNone = () => modal.setAttribute("style", "display:none");


  return (
    <form onSubmit={submitOff} className="new-task">
      <input placeholder="Tarea" type={"text"} className={"titulo"} />
      <div className="button-contain">
        <button onClick={modalNone} className={`button`}>Cancelar</button>
        <button className={`button`}>Enviar</button>
      </div>
    </form>
  );
}
