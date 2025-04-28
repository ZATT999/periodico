import { useContext, useState } from "react"
import { UserContext } from "../context/context"
import { Link, useNavigate } from "react-router"
import { LogoutUser } from "../services/UserServices"
import useIsAdmin from "../hooks/useIsAdmin"

export default function Header() {
  const { user, setUser } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { isAdmin } = useIsAdmin()

  const handleLogout = () => {
    navigate("/")
    LogoutUser()
    setUser(null)
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <header className="z-40 fixed top-0 flex justify-between px-3 pt-6 border-b-1 border-blue-500 max-w-[800px] w-full m-auto backdrop-blur-md">
      <Link to="/">
        <h1 className="text-4xl font-bold font-[roboto]">CTE</h1>
      </Link>
      {!user ? (
        <Link to="/login">
          <span className="text-2xl hover:text-blue-400 transition-all">
            Iniciar sesión
          </span>
        </Link>
      ) : (
        <div className="relative flex justify-center gap-2">
          <div
            onClick={handleModalToggle}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl font-bold">{user.name}</span>
            <img
              src={user.avatar}
              alt={`${user.name}`}
              className="w-8 h-8 rounded-full border-1 border-black cursor-pointer"
            />
          </div>
          {/* Modal de opciones */}
          {isModalOpen && (
            <div className="absolute top-10 right-[-12px] bg-white p-4 rounded-b-lg  shadow-lg w-48 text-center z-50">
              <ul className="space-y-4">
                <li>
                  <button className="w-full text-md cursor-pointer hover:text-blue-400">
                    Cambiar Contraseña
                  </button>
                </li>
                <li></li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin/panel"
                      className="w-full  hover:text-blue-400"
                      onClick={handleModalToggle}
                    >
                      Ir al Panel
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-400 cursor-pointer"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
