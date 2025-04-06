import { useParams } from "react-router"
import noticias from "../noticias.json"
import Noticia from "../components/noticia"
import "./styles/noticias.css"
import { useEffect } from "react"

export default function NoticiaId() {
  let params = useParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.slug])

  const noticia = noticias.filter((noticia) => noticia.slug == params.slug)

  return (
    <>
      <Noticia
        image={noticia[0].images[0]}
        content={noticia[0].content}
        subtitle={noticia[0].subtitle}
        title={noticia[0].title}
        author={noticia[0].author}
        date={noticia[0].date}
        category={noticia[0].category}
        descripcion={noticia[0].description}
      />
    </>
  )
}
