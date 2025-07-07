import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/userHomePage'
import AdminHomePage from './pages/adminHomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-primary'>
     <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes path="/*">         
        <Route path="/*" element={<HomePage/>}/>   
        <Route path="/admin/*" element={<AdminHomePage/>}/>             
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
