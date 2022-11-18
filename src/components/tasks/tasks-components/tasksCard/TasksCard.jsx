import "./tasksCard.css";
import { VscClose, VscCheck } from "react-icons/vsc";

export default function TasksCard({ task }) {

    

  return (
    <div className="task-card-div">
      <button>
        <VscClose />
      </button>

      <p className="task-p">{task.description}</p>
      <button>
        <VscCheck />
      </button>
    </div>
  );
}
