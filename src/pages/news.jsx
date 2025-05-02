import { useContext } from "react"
import MapNews from "../components/mapNews"
import { NewsContext } from "../context/context"
import { changeTitle } from "../utils/changeTitle"
import LastNews from "../components/ui/lastNews"

export default function NewsPage() {
  const { news } = useContext(NewsContext)
  changeTitle("Noticias")
  const mainNews = news[0]

  return (
    <>
      <header className="py-6 mb-2 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold uppercase tracking-wider leading-tight">
          CTE: Visión Empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <LastNews news={mainNews} />

      <MapNews />
    </>
  )
}
