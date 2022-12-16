import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const isRegister = mode === 'register';

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    await authenticate(mode, form);
    navigate('/tasks');
  }

  return <main className="auth-panel">
    <h1>{isRegister ? 'Create an account' : 'Welcome back'}</h1>
    <form onSubmit={submit}>
      {isRegister && <label>Name<input name="name" value={form.name} onChange={update} required /></label>}
      <label>Email<input name="email" type="email" value={form.email} onChange={update} required /></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={update} required /></label>
      <button>{isRegister ? 'Register' : 'Log in'}</button>
    </form>
    <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Already registered?' : 'Need an account?'}</Link>
  </main>;
}
