import "./TaskModal.css";

export default function TaskModal({ date, tasks, onClose, onDelete, onToggle }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Tasks on {date.toDateString()}</h3>

        {tasks.length === 0 ? (
          <p>No tasks for this date.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="modal-task">
              <div>
                <strong className={task.completed ? "done" : ""}>
                  {task.title}
                </strong>
                {task.time && <span> ⏰ {task.time}</span>}
                {task.notes && <p className="notes">📝 {task.notes}</p>}
              </div>
              <div className="actions">
                <button onClick={() => onToggle(task.id, !task.completed)}>
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
