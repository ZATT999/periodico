import { Link } from "react-router"
import Header from "../components/header"

export default function NotFound() {
  window.scrollTo(0, 0)

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-6xl text-center font-bold">404</h1>
        <h3 className="text-center text-xl">La página que buscas no existe</h3>
        <Link
          to="/"
          className="text-xl hover:bg-[#488049] transition-all bg-primary text-white px-3 py-2 mt-4 rounded-lg"
        >
          ir al inicio
        </Link>
      </main>
    </>
  )
}
