export default function TaskCard({ task, onEdit }) {
  return <article className="task-card">
    <button className="plain" onClick={() => onEdit(task)}>{task.title}</button>
    {task.description && <p>{task.description}</p>}
    <small>{task.priority} priority</small>
  </article>;
}
