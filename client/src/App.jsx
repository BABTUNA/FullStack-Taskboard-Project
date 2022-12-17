import { Link, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TaskBoard from './pages/TaskBoard';

function Home() {
  return <main><h1>Keep work moving.</h1><p>A small board for personal projects.</p><Link to="/register">Get started</Link></main>;
}

export default function App() {
  return <div className="app"><header><Link to="/">Taskboard</Link></header><Routes><Route path="/" element={<Home />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/tasks" element={<TaskBoard />} /></Routes></div>;
}
