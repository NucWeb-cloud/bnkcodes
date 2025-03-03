import React from 'react'
import { useContext } from 'react'
import  {context} from './Parent'

const Child = () => {

const {name,setName,age,setAge,updateCount,handleColor}=useContext(context);


const handleAge=()=>{
    
    setAge(age+5);
}

const handleInput=(e)=>{

    setName(e.target.value);


}

const handleCount=()=>{
  updateCount();
}
const colorChange=()=>{
  handleColor();
}

  return (
    <>
    <h1>Child</h1>
    <h2>Name: {name}</h2>
    <h2>Age: {age}</h2>
    <input type="text" value={name} onChange={handleInput}  />
    
    <button onClick={handleAge}>Change Age</button>

    <button onClick={handleCount}>Incr</button>

    <button onClick={colorChange}>Change Color </button>

    
    </>
  )
}

export default Child