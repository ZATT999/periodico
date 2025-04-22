import { useContext } from "react"
import { UserContext } from "../context/context"
import { Link } from "react-router"

export default function Header() {
  const { user } = useContext(UserContext)

  return (
    <header className="z-40 fixed top-0 flex justify-between px-3 pt-6  border-b-1 border-blue-500 max-w-[800px] w-full m-auto backdrop-blur-md ">
      <Link to="/">
        <h1 className="text-4xl  font-bold font-[roboto]">CTE</h1>
      </Link>
      {!user ? (
        <Link to="/login">
          <span className="text-2xl  hover:text-blue-400 transition-all">
            Iniciar sesión
          </span>
        </Link>
      ) : (
        <div className="flex justify-center gap-2">
          <span className="text-xl font-bold">{user?.name}</span>
          <img
            src={user?.avatar}
            alt={`${user?.name}`}
            className="w-8 h-8 rounded-full border-1 border-black"
          />
        </div>
      )}
    </header>
  )
}
