import { Link } from "react-router"
import logo from "../assets/logo.webp"
import { NewsContext } from "../context/context"
import { CloseIcon, HamburgerIcon } from "./icons"
import { useContext, useState } from "react"

export default function SideBarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { categorys } = useContext(NewsContext)

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <HamburgerIcon size={30} />
      </button>

      <dialog
        open
        className={`fixed inset-0 h-full bg-white z-50 m-0 p-0 shadow-lg 
          transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon size={30} />
        </button>
        <main className="flex flex-col h-full max-w-[400px] w-full sm:w-[400px] mx-auto">
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold font-[roboto] text-gray-800">
              Noticias
            </h1>
          </div>

          <section className="flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 my-4 text-center">
              Categorías
            </h2>
            <ul className="flex flex-col gap-3 px-10 ">
              {categorys.map((category) => (
                <li key={category}>
                  <Link
                    to={`/noticias/${category}`}
                    className="block text-gray-600 hover:text-blue-500 font-medium transition border-b border-gray-200 pb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Contacto
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Correo:</span>{" "}
                ctenoticias@gmail.com
              </li>
              <li>
                <span className="font-medium">Dirección:</span> Cl. 16a #1236,
                Valledupar, Cesar
              </li>
            </ul>
          </section>
        </main>
      </dialog>
    </>
  )
}
