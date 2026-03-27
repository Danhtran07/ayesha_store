"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
    router.push("/")
  }

    fetch("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProducts(data) 
      })
      .catch(err => {
        console.log(err)
        alert("Lỗi khi lấy sản phẩm!")
      })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome admin 😎</p>

      <h2>Products:</h2>

      {products.length === 0 ? (
        <p>Không có sản phẩm</p>
      ) : (
        products.map(p => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>Price: VND {p.price}</p>
          </div>
        ))
      )}
    </div>
  )
}