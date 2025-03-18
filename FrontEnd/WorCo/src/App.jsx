import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import WorkerRegistrationForm from './components/WorkerRegistrationForm'
import LoginForm from './components/LoginForm'
import HomePage from './pages/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/worker-register" element={<WorkerRegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add routes for other pages like Workers, Cart, Orders */}
        <Route path="/workers" element={<div>Workers Page</div>} />
        <Route path="/cart" element={<div>Cart Page</div>} />
        <Route path="/orders" element={<div>Orders Page</div>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
