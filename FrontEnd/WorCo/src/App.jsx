import { useState } from 'react'

import './App.css'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginForm />
    </>
  )
}

export default App
