import { useEffect, useState } from "react"
import { Navigate } from "react-router"

export default function Login() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    }).catch((err) => console.log(err))
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = e.target.elements[0].value
    const password = e.target.elements[1].value
    setUser({ id, password })
  }

  return (
    <>
      <main>
        <h1 className="title">Login</h1>
        <p>Ingresa tus datos para acceder al periodico</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
        </form>
      </main>
    </>
  )
}
