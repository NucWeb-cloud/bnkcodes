import React, { useEffect } from 'react'

const Cart = () => {
    
    const [cart, setCart] = React.useState([]);
    const[loading,setLoading]=React.useState(true);
    const[error,setError]=React.useState(null);
    const [search,setSeacrh]=React.useState("");


    useEffect(() => {
        fetch("https://dummyjson.com/carts")
        .then((res)=> {
            if(!res.ok){
                throw Error("Could not fetch the data")
            }
            return res.json()
        })
        .then((data)=>{
            setCart(data.carts)
            setLoading(false)

        })
        .catch((error)=>{
            setError(error)
            setLoading(false)
        })
    
    }, []);

    const handleSearch=(e)=>{
        setSeacrh(e.target.value.toLowerCase());

    }

    const filterProduct=cart.map((item)=>({
      ...item,
      products:item.products.filter((product)=>
    product.title.toLowerCase().includes(search) 
    ),

    }));

    
  return (
   <>

   <h1>Carts</h1>
   <input type="text" placeholder='Search Item' value={search} onChange={handleSearch} />
    {loading && <p>Loading...</p>}
    {error && <p>Error</p>}

    <ul>
        {filterProduct.map((item)=> item.products.length > 0 && (
            <li key={item.id}>
                <h3>Id   : {item.id}</h3>


                <ul>

               {item.products.map((product)=>(
                <li key={product.id}>
                    {product.title}
                    <p>Discounted Percentage : {product.discountPercentage} % </p>
                    <p>Discount Total : {product.discountedTotal}</p>
                </li>
                 ))}
                  </ul>
            </li>
        )
        )}
       

      

        
    </ul>

   </>
  )
}

export default Cart


//yesterday i have given the interiew but due to some issue with inline compiler 
//i was not able to show the required output , but when i ran the samecode in vsccode it was working fine

//so what is feedback of the interview

//can u pleas route my profile to another Project.......
