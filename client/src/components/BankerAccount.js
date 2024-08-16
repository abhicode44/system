import React, { useEffect, useState } from 'react'
import axios from 'axios' ;
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
function BankerAccount() {
  const [users , setUsers] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
axios.get('http://localhost:5000/api/users/usersList')
  .then(users  => setUsers(users.data))
  .catch(err => console.log(err))
  } , [])
  return (
    <div className='w-100 100-vh d-flex justify-content-center align-items-center '>
      <div className='w-50'>

      
      <table className='table '>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            })
          }
        </tbody>
      </table>

      <button onClick={() => navigate("/")}>
                Logout
            </button>
    </div>
    </div>
  )
}

export default BankerAccount