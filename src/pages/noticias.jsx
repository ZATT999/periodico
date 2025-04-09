import { Link } from "react-router"
import "./styles/noticias.css"
import MapNoticias from "../components/MapNoticias"

import noticias from "../noticias.json"
import { useEffect, useState } from "react"

export default function NoticiasPage() {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * noticias.length)
  )
  const noticiasData = noticias

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % noticiasData.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(intervalo)
  }, [noticiasData.length])

  const noticiaActual = noticiasData[index]

  return (
    <>
      <h1 className="titlePage">CTE: visiones empresariales</h1>
      <main>
        <section className="ultimaNoticia">
          <img
            src={noticiaActual.images[0].src}
            alt={noticiaActual.images[0].alt}
          />

          <div className="carouselContent">
            <h2>{noticiaActual.title}</h2>
            <h3>{noticiaActual.date}</h3>
            <p>{noticiaActual.description}</p>
          </div>
        </section>

        <h1 className="title">Noticias</h1>
        <MapNoticias />
      </main>
    </>
  )
}
