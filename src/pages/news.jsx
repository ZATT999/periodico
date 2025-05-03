import { changeTitle } from "../utils/changeTitle"
import LastNews from "../components/ui/lastNews"
import { NewsContext } from "../context/context"
import MapNews from "../components/mapNews"
import { useContext } from "react"

export default function NewsPage() {
  const { news } = useContext(NewsContext)
  changeTitle("Noticias")

  const visibleNews = news.filter((news) => news.visible === true)

  const lastNew = visibleNews[0]

  return (
    <>
      <header className="py-6 mb-2 text-center">
        <h1 className="text-4xl ml:text-5xl md:text-6xl mb-2 font-serif font-bold uppercase tracking-wider leading-tight">
          CTE: Visión empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <LastNews news={lastNew} />

      <MapNews news={visibleNews} />
    </>
  )
}
