import React, { useEffect, useMemo, useState } from 'react'

const Data3 = () => {

    const[data,setData]=useState([]);
    const [search,setSearch]=useState("");

    const [loading,setLoading]=useState(true);
    const [err,setErr]=useState(null);


    useEffect(() => {
     const fetchData=async () => {
        try {

            const res=await fetch("");

            const json=res.json();
            setData(json.data);

    
            
          } catch (error) {
            setErr(error.message)
            
          }finally{
            setLoading(false)
          }
        
        
     }
     fetchData();
     
    }, []);


    const handleSearch=useMemo(() => {
        return data.filter((user)=>user.age.toLowerCase().includes(search.toLowerCase()))
    }
    , [data,search]);


    const deleteUser=(id)=>{
        return data.filter((prev)=>prev.filter((user)=>user.id!==id))
    };
    

if(loading) return <p>Loading........</p>
if(err) return <p>Error Occurred......</p>



  return (
  <>
  <div className="container">
    <h1>User Data</h1>

    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search user by Age' />

    {handleSearch.length>0 ? 
    (
        <ul>
            {handleSearch.map((item)=>(
                <li key={item.id}> {item.userName} - {item.birthDate} - {item.age}
                <button onClick={deleteUser(item.id)}>Delete</button>
                </li>
            ))}
        </ul>

     ):(
        <p>No data.</p>
     )}


  </div>
  
  
  </>
  )
}

export default Data3