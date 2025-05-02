import { LoginUser } from "../services/UserServices"
import { UserContext } from "../context/context"
import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useContext(UserContext)

  if (user) return <Navigate to="/" />

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)
      const id = formData.get("id")
      const password = formData.get("password")

      const res = await LoginUser({ id, password })
      const data = await res.json()

      if (res.status === 401) {
        toast.error("Usuario o contraseña incorrectos")
        return
      }

      if (!res.ok) {
        toast.error("Error al iniciar sesión")
        return
      }

      setUser(data.user)
      navigate("/")
    } catch (err) {
      toast.error("Algo salió mal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className=" min-h-screen flex items-center justify-center px-6 py-10 text-black">
      <div className="w-full max-w-md bg-blue-50 p-8 rounded-2xl shadow-lg border-2 border-blue-100">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
          iniciar sesión
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Ingresa tus datos para acceder
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="id"
            name="id"
            placeholder="Documento de Identidad"
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
          {loading ? (
            <button
              type="button"
              className="btn btn-primary w-full bg-blue-600 text-white rounded-xl p-2 cursor-not-allowed"
            >
              Cargando...
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white rounded-xl p-2 cursor-pointer hover:bg-blue-700 transition duration-200"
            >
              Iniciar sesión
            </button>
          )}
        </form>
      </div>
    </main>
  )
}
