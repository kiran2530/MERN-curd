import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Users from './components/Users'
import AddUsers from './components/AddUsers'
import UpdateUsers from './components/UpdateUsers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Users/>} ></Route>
          <Route path='/addUser' element={<AddUsers/>} ></Route>
          <Route path='/updateUser/:id' element={<UpdateUsers/>} ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
