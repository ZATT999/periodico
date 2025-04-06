import { Link } from "react-router"
import "./styles/noticias.css"
import MapNoticias from "../components/MapNoticias"

export default function NoticiasPage() {
  return (
    <>
      <h1 className="titlePage">CTE: visiones empresariales</h1>
      <main>
        <h1 className="title">Noticias</h1>
        <MapNoticias />
      </main>
    </>
  )
}
