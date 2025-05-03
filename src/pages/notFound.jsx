import { Link } from "react-router"
import Header from "../components/header"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-3xl text-center">404</h1>
        <h3>Pagina no encontrada</h3>
        <Link to="/">Ir al inicio</Link>
      </main>
    </>
  )
}
