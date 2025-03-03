import React, { useEffect, useMemo, useState } from 'react'

const Data4 = () => {

    const[data,setData]=useState([]);
        const [search,setSearch]=useState("");
    
        const [loading,setLoading]=useState(true);
        const [err,setErr]=useState(null);


        useEffect(() => {
          const fetchData=async () => {
            try {
                const res=await fetch("");
                const json=res.json();

                if(!res.ok){
                throw new Error("Error Occured ")
                }

                setData(json.users)
                
            } catch (error) {
                setErr(error.message)
            }
            finally{
                setLoading(false)
            }
            
          }
        fetchData();
        
        }, []);

        const filterData=useMemo(() => 
        {
            return data.filter((user)=>user.userName.toLowerCase().includes(search.toLowerCase()))
        }   , [data,search]);


        const deleteHandle=(id)=>{
            // return data.filter((prev)=>prev.filter((user)=>user.id!==id));
            setData((prev)=>prev.filter((user)=>user.id!==id));
        };




  return (
   <>
   <div className="container">
    <h1>User in tables</h1>
    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search here' />

    {
        filterData.length>0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Age</th>
                        <th>BirthDate</th>
                    </tr>
                </thead>
                <tbody>

                {
                    filterData.map((item)=>(
                    
                            <tr key={item.id}>
                                <td>{item.userName}</td>
                                <td>{item.age}</td>
                                <td>{item.birthDate}</td>

                                <td>
                                    <button onClick={()=>deleteHandle(item.id)}>Delete User</button>
                                </td>
                            
                            </tr>
                       
                    ))
                }
                </tbody>
            </table>
        ) : (
            <p>No data found</p>
        )
    }


   </div>
   
   </>
  )
}

export default Data4