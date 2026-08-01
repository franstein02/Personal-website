import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('failed to connect'))
  }, [])

  return (
    <div>
      <h1>Personal Website</h1>
      <p>Backend status: {status}</p>
    </div>
  )
}

export default App