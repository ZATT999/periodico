import { Link } from "react-router"
import "./styles/noticia.css"
import { useState, useEffect } from "react"

export default function Noticia({ title, p, image, subtitle }) {
  const [fechaActual, setFechaActual] = useState("")

  useEffect(() => {
    const fecha = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    // Capitalizar primera letra
    const fechaCapitalizada = fecha.charAt(0).toUpperCase() + fecha.slice(1)
    setFechaActual(fechaCapitalizada)
  }, [])

  return (
    <>
      <article className="noticia">
        <Link to="/">
          <span className="icon-home">&#8592;</span> Inicio
        </Link>
        <h1 className="titleNoticia">DIARIO CTE: Visión empresarial</h1>
        <header className="noticia-header">
          <p>
            El periódico favorito del colegio <br />
          </p>
          <p className="fecha">{fechaActual}</p>
        </header>
        <article className="noticia-body">
          <h2>{title}</h2>
          {subtitle && <h3>{subtitle}</h3>}
          <p>{p}</p>
          {image && (
            <img
              src={image}
              alt={title || "Imagen del artículo"}
              loading="lazy"
            />
          )}
        </article>
      </article>
    </>
  )
}
