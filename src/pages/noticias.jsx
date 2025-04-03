import { Link } from "react-router"
import "./styles/noticias.css"
import MapNoticias from "../components/MapNoticias"

import noticias from "../noticias.json"

export default function NoticiasPage() {
  const ultimaNoticia = noticias.noticias[-0]

  return (
    <>
      <h1 className="titlePage">CTE: visiones empresariales</h1>
      <main>
        <section className="ultimaNoticia">
          <img src={ultimaNoticia.image} alt={ultimaNoticia.subtitle} />
          <h1 className="ntR">Noticia mas reciente</h1>
          <div>
            <h1>{ultimaNoticia.title}</h1>
            <p>{ultimaNoticia.p}</p>
          </div>
        </section>
        <h1 className="title">Noticias</h1>
        <MapNoticias />
      </main>
    </>
  )
}
