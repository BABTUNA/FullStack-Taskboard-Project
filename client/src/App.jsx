import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return <main><h1>Keep work moving.</h1><p>A small board for personal projects.</p></main>;
}

export default function App() {
  return <div className="app"><header><Link to="/">Taskboard</Link></header><Routes><Route path="/" element={<Home />} /></Routes></div>;
}
