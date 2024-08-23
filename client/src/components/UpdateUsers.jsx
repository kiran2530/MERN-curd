import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UpdateUsers() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const navigate = useNavigate()

  const {id} = useParams() // use to seperate the key from url

  useEffect(()=> {
    axios.get('http://localhost:3001/api/getUser/'+id)
    .then(result => {
      console.log(result);
      setName(result.data[0].name);
      setEmail(result.data[0].email);
      setAge(result.data[0].age)
    })
    .catch(err =>console.log(err))
  },[])

  const updateUserData = (e) => {
    e.preventDefault();
      axios.put("http://localhost:3001/api/updateUser/"+id, {name, email, age})
      .then(result => {
        console.log(result)
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={updateUserData}>
        <h2>Update Users</h2>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Name</label>
            <input type="text" placeholder='Enter Name' className="form-control" id=""  value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Email</label>
            <input type="email" className="form-control" id="" aria-describedby="emailHelp" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Age</label>
            <input type="text" className="form-control" id="" aria-describedby="emailHelp" placeholder='Enter Age' value={age} onChange={(e)=>setAge(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}
