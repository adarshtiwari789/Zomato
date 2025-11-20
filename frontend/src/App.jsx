import { useState } from 'react'
import './App.css'
import Approutes from './routes/AppRoutes'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Approutes />
   </>
  )
}

export default App
