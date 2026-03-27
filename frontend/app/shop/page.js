"use client"
import { useEffect, useState } from "react"

export default function Shop(){

const [products,setProducts] = useState([])

useEffect(()=>{
fetch("http://localhost:5000/api/products")
.then(res=>res.json())
.then(data=>setProducts(data))
},[])

return(

<div style={{padding:"40px"}}>

<h1>Shop</h1>

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>

{products.map(product=>(
<div key={product._id} style={{border:"1px solid #ccc",padding:"20px"}}>

<h3>{product.name}</h3>
<p>{product.description}</p>
<p>${product.price}</p>

<button>Add to cart</button>

</div>
))}

</div>

</div>

)
}