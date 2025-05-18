import { changeTitle } from "../utils/changeTitle"
import LastNews from "../components/ui/lastNews"
import { NewsContext } from "../context/context"
import MapNews from "../components/mapNews"
import { useContext } from "react"
import NavHeader from "../components/ui/navHeader"

export default function NewsPage() {
  window.scrollTo(0, 0)

  const { news } = useContext(NewsContext)
  changeTitle("Noticias")

  const visibleNews = news.filter((news) => news.visible === true)

  const lastNew = visibleNews[0]

  return (
    <>
      <NavHeader />

      <LastNews news={lastNew} />

      <MapNews news={visibleNews} />
    </>
  )
}
