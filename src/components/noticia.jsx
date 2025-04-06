import { Link } from "react-router"
import "./styles/noticia.css"
import HTMLReactParser from "html-react-parser/lib/index"

export default function Noticia({ content, date, author, category }) {
  return (
    <article className="noticia">
      <Link to="/" className="volver-inicio">
        <span className="icon-home">&#8592;</span> Inicio
      </Link>

      <h1 className="titleNoticia">DIARIO CTE: Visión empresarial</h1>

      <header className="noticia-header">
        <p>El periódico favorito del colegio</p>
        <p className="fecha">{date}</p>

        <p className="categoria">
          <strong>Categoría:</strong> {category}
        </p>
      </header>

      <section className="noticia-body">
        <strong>Autor:</strong> {author}
        <div className="noticia-content">{HTMLReactParser(content)}</div>
      </section>
    </article>
  )
}
