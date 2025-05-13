import { changeTitle } from "../utils/changeTitle"
import LastNews from "../components/ui/lastNews"
import { NewsContext } from "../context/context"
import MapNews from "../components/mapNews"
import { useContext } from "react"
import Categorys from "../components/categorys"
import MenuCategorys from "../components/menuCategorys"

export default function NewsPage() {
  const { news } = useContext(NewsContext)
  changeTitle("Noticias")

  const visibleNews = news.filter((news) => news.visible === true)

  const lastNew = visibleNews[0]

  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "2-digit",
  })

  return (
    <>
      <section className="flex items-center justify-between gap-2 mb-4 text-gray-600 px-4">
        <MenuCategorys ref={dialogMenuRef} />
        <span className="font-bold">{currentDate}</span>
      </section>

      <header className="py-6 mb-2 text-center">
        <h1 className="text-3xl @[250px]:text-4xl ml:text-5xl md:text-6xl font-extrabold tracking-wider uppercase text-gray-800">
          CTE: Visión empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <Categorys />

      <LastNews news={lastNew} />

      <MapNews news={visibleNews} />
    </>
  )
}
