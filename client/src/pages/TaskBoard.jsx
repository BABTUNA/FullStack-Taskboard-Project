import { useEffect, useState } from 'react';
import { api } from '../api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const columns = [['todo', 'To do'], ['doing', 'In progress'], ['done', 'Done']];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api('/tasks').then((data) => setTasks(data.tasks)); }, []);

  async function save(values) {
    const path = editing.id ? `/tasks/${editing.id}` : '/tasks';
    const result = await api(path, { method: editing.id ? 'PUT' : 'POST', body: JSON.stringify(values) });
    setTasks(editing.id ? tasks.map((task) => task.id === editing.id ? result.task : task) : [result.task, ...tasks]);
    setEditing(null);
  }

  async function move(task, status) {
    const result = await api(`/tasks/${task.id}`, {
      method: 'PUT', body: JSON.stringify({ ...task, status }),
    });
    setTasks(tasks.map((item) => item.id === task.id ? result.task : item));
  }

  return <main>
    <div className="board-heading"><h1>My tasks</h1><button onClick={() => setEditing({})}>New task</button></div>
    <section className="board">
      {columns.map(([status, label]) => <div className="column" key={status}>
        <h2>{label}</h2>
        {tasks.filter((task) => task.status === status).map((task) => <TaskCard key={task.id} task={task} onEdit={setEditing} onMove={move} />)}
      </div>)}
    </section>
    {editing && <TaskForm task={editing} onSave={save} onCancel={() => setEditing(null)} />}
  </main>;
}
