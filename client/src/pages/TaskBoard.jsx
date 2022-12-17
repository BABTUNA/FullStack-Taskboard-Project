import { useEffect, useState } from 'react';
import { api } from '../api';
import TaskCard from '../components/TaskCard';

const columns = [['todo', 'To do'], ['doing', 'In progress'], ['done', 'Done']];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api('/tasks').then((data) => setTasks(data.tasks)); }, []);

  return <main>
    <div className="board-heading"><h1>My tasks</h1><button onClick={() => setEditing({})}>New task</button></div>
    <section className="board">
      {columns.map(([status, label]) => <div className="column" key={status}>
        <h2>{label}</h2>
        {tasks.filter((task) => task.status === status).map((task) => <TaskCard key={task.id} task={task} onEdit={setEditing} />)}
      </div>)}
    </section>
    {editing && <p className="notice">Task editor coming next.</p>}
  </main>;
}
