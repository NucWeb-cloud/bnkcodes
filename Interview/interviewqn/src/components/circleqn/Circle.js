import React, { useState } from 'react'

const Circle = () => {
    const [circle,setCircle]=useState();

    const input=(e)=>{
        const val=parseInt(e.target.value,10);
        setCircle(!isNaN(val)?val:0);

    }
  return (
   <>
   <div>
    <h1>Dynamic Circles</h1>
         <input type="number" value={circle} onChange={input} placeholder='Enter Number'/>

         {
            Array.from({length:circle },(_,index)=>(
                 <div key={index} style={{width:'100px',height:'100px',borderRadius:'50%',backgroundColor:'red',margin:'10px', display:"inline-block" ,}}></div>
            ))
         }
        
   </div>
   
   </>
  )
}

export default Circle