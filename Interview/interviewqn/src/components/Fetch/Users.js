import React, { useEffect, useState } from 'react'

const Users = () => {

    const [users,setUsers]=useState([]);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>{
            if(!res){
                throw Error("Could not fetch the data")
            }
            return res.json()
        }).then((data)=>{
            setUsers(data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    },[]);



  return (
 <>
 <div>
    <h1>Users</h1>
 </div>
 <div>
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
       <tbody >
       <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
        </tr>
        {loading && <p>Loading...</p>}
        {users.map((user)=>(
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>
        ))}
       </tbody>
    </table>
 </div>
 
 </>
  )
}

export default Users