import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function AddUsers() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [age, setAge] = useState()
  const navigate = useNavigate()

  const postData = (e) => {
      e.preventDefault();
      axios.post("http://localhost:3001/api/addUser", {name, email, age})
      .then(result => {
        console.log(result)
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={postData}>
        <h2>Add Users</h2>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Name</label>
            <input type="text" className="form-control" id="" placeholder='Enter Name' onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Email</label>
            <input type="email" className="form-control" id="" aria-describedby="emailHelp" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Age</label>
            <input type="text" className="form-control" id="" aria-describedby="emailHelp" placeholder='Enter Age' onChange={(e) => setAge(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
