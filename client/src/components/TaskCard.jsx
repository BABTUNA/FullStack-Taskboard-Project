const nextStatus = { todo: 'doing', doing: 'done', done: 'todo' };

export default function TaskCard({ task, onEdit, onMove }) {
  return <article className="task-card">
    <button className="plain" onClick={() => onEdit(task)}>{task.title}</button>
    {task.description && <p>{task.description}</p>}
    <small>{task.priority} priority</small>
    <button className="move" onClick={() => onMove(task, nextStatus[task.status])}>
      Move to {nextStatus[task.status]}
    </button>
  </article>;
}
