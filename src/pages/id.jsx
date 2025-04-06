import { useParams } from "react-router"
import noticias from "../noticias.json"
import Noticia from "../components/noticia"
import "./styles/noticias.css"

export default function NoticiaId() {
  let params = useParams()

  const noticia = noticias.noticias.filter(
    (noticia) => noticia.id == params.noticiaId
  )

  return (
    <>
      <Noticia
        image={noticia[0].image}
        content={noticia[0].content}
        subtitle={noticia[0].subtitle}
        title={noticia[0].title}
      />
    </>
  )
}
