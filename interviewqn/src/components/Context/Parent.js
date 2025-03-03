import React, { createContext, useState } from 'react'

export const context=createContext();

const Parent = ({children}) => {
    const[name,setName]=useState('John');
    const[age,setAge]=useState(25);

    const [count,setCount]=useState(0);
    const [color,setColor]=useState('red');

    const updateCount=()=>{
      setCount(count+5);
    };
   
    const handleColor=()=>{
      setColor('blue');
    }

  return (
  <>
  <context.Provider value={{name,setName,age,setAge,count,updateCount,handleColor}}>
    {children }
  </context.Provider>

  <h2>parent</h2>
  <h3>Count : {count}</h3>
  <h4 style={{color:color}}>Hi</h4>
  
  </>
  )
}

export default Parent;