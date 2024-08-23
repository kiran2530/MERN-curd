import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageUpload from './ImageUpload'

export default function Users () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/getUser')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
  }, [])

  const deleteUser = id => {
    axios
      .delete('http://localhost:3001/api/deleteUser/' + id)
      .then(result => {
        console.log(result)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='App'>
        <h1>Image Upload and Display Example</h1>
        <ImageUpload />
      </div>

      <Link className='btn btn-primary' to='/addUser'>
        Add +{' '}
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Age</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(users => {
            return (
              <tr key={users.email}>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.age}</td>
                <td>
                  <Link
                    className='btn btn-success mx-2'
                    to={`/updateUser/${users._id}`}
                  >
                    {' '}
                    Update{' '}
                  </Link>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={e => deleteUser(users._id)}
                  >
                    {' '}
                    Delete{' '}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
