import { Link } from "react-router"
import noticias from "../noticias.json"
import Masonry from "react-masonry-css"

export default function MapNoticias() {
  const breakpointColumnsObj = {
    default: 4,
    1000: 3,
    700: 2,
    500: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="ContentCards"
      columnClassName="ContentCardsColums"
    >
      {noticias.noticias.map((noticia) => (
        <Link to={`noticia/${noticia.id}`} key={noticia.id}>
          <div className="NoticiaCard">
            <img src={noticia.image} alt="Evento" />
            <h2>{noticia.title}</h2>
          </div>
        </Link>
      ))}
    </Masonry>
  )
}
