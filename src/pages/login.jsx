import { LoginUser } from "../services/UserServices"
import { UserContext } from "../context/context"
import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  if (user) return <Navigate to="/" />

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const id = formData.get("id")
    const password = formData.get("password")

    const res = await LoginUser({ id, password })

    const data = await res.json()
    if (res.status === 401)
      return toast.error("Usuario o contraseña incorrectos")

    if (!res.ok) return toast.error("Error en el servidor")

    setUser(data.user)
    navigate("/")
    navigate(0)
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
        </form>
      </div>
    </main>
  )
}
