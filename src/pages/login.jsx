import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../context/context"
import User from "../../../backEnd/models/user"

export default function Login() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const onSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: e.target.elements[0].value,
        password: e.target.elements[1].value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          fetch("http://localhost:3000/api/user/me", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err))

          return res.json()
        } else {
          throw new Error("Error al ingresar")
        }
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        navigate("/")
      })
  }

  if (user) {
    navigate("/")
  }

  return (
    <main className=" min-h-screen flex items-center justify-center px-6 py-10 text-black">
      <div className="w-full max-w-md bg-blue-50 p-8 rounded-2xl shadow-lg border-2 border-blue-100">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
          Login
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Ingresa tus datos para acceder
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="id"
            name="id"
            placeholder="id"
            required
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Ingresar
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </main>
  )
}
