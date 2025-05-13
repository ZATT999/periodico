import logo from "../assets/logo.webp"
import { CloseIcon, HamburgerIcon } from "./ui/icons"
import { useState } from "react"

export default function MenuCategorys() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <HamburgerIcon size={30} />
      </button>

      <dialog
        open={isOpen}
        className="fixed inset-0 w-[250px] h-full bg-white z-50 m-0 p-0 shadow-lg "
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon size={30} />
        </button>
        <main className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold text-gray-800">Noticias</h1>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 my-4 text-center">
            Categorías
          </h2>
          <ul className="flex flex-col gap-3 px-4">
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Sociedad
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Educación
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Salud y bienestar
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Economía y finanzas
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Deportes
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Cultura
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Tecnología
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-gray-600 hover:text-blue-500 font-medium transition"
              >
                Anuncios
              </a>
            </li>
          </ul>
        </main>
      </dialog>
    </>
  )
}
