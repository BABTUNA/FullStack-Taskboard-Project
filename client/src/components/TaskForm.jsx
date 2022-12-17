import { useState } from 'react';

export default function TaskForm({ task = {}, onCancel, onSave }) {
  const [values, setValues] = useState({
    title: task.title || '', description: task.description || '',
    status: task.status || 'todo', priority: task.priority || 'normal',
  });
  const change = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  return <form className="task-form" onSubmit={(event) => { event.preventDefault(); onSave(values); }}>
    <h2>{task.id ? 'Edit task' : 'New task'}</h2>
    <label>Title<input name="title" value={values.title} onChange={change} required /></label>
    <label>Description<textarea name="description" value={values.description} onChange={change} /></label>
    <label>Priority<select name="priority" value={values.priority} onChange={change}><option>low</option><option>normal</option><option>high</option></select></label>
    <div><button>Save</button> <button type="button" className="secondary" onClick={onCancel}>Cancel</button></div>
  </form>;
}
