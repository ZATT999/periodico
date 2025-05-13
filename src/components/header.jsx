import { useContext, useState } from "react"
import { UserContext } from "../context/context"
import { Link, useNavigate } from "react-router"
import { LogoutUser } from "../services/UserServices"
import { ArrowDownIcon, LogoutIcon, UserIcon } from "./ui/icons"
import logo from "../assets/logo.webp"

export default function Header() {
  const { user, setUser } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/")
    LogoutUser()
    setUser(null)
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <header className="z-40 fixed top-0 flex justify-between items-center px-2 ml:px-4 h-15 sm:h-20  w-full m-auto bg-white shadow-lg">
      <Link to="/">
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="size-10 mr-2 ml:size-15" />
          <h1 className="text-2xl font-bold font-[roboto] text-gray-800 ml:text-4xl ">
            Noticias
          </h1>
        </div>
      </Link>

      <div className="relative flex justify-center gap-2">
        <div
          onClick={handleModalToggle}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={
              user?.avatar ??
              "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
            }
            alt={`${user?.name ?? "anonymous"}`}
            className="w-8 h-8 rounded-full border-1 border-black cursor-pointer"
          />

          <ArrowDownIcon size={20} />
        </div>
        {isModalOpen && (
          <div className="absolute top-10 -right-1 bg-white border-1 border-gray-100 rounded-lg  shadow-md  w-45 text-center z-50">
            <ul className=" flex flex-col ">
              {!user ? (
                <li>
                  <Link
                    to="/login"
                    className="w-full p-3 rounded hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2"
                    onClick={handleModalToggle}
                  >
                    <span className="text-blue-500">
                      <UserIcon />
                    </span>
                    Iniciar Sesión
                  </Link>
                </li>
              ) : (
                <>
                  <li className="flex items-center justify-center gap-2 px-4 py-2 border-b-1 border-gray-300">
                    <img
                      src={
                        user.avatar ??
                        "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                      }
                      alt={`${user.name ?? "anonymous"}`}
                      className="w-8 h-8 rounded-full border-1 border-black"
                    />
                    <span>{user.name ?? "anonymous"}</span>
                  </li>
                  {user.isAdmin && (
                    <li className="flex items-center gap-2">
                      <Link
                        to="/admin/panel"
                        className="w-full p-3 rounded hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2"
                        onClick={handleModalToggle}
                      >
                        <span className="text-blue-500">
                          <UserIcon />
                        </span>
                        Ir al Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full p-3 rounded hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="text-red-500">
                        <LogoutIcon />
                      </span>
                      <span>Cerrar Sesión</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
