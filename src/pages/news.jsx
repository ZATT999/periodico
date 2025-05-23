import { changeTitle } from "../utils/changeTitle"
import LastNews from "../components/lastNews"
import { NewsContext } from "../context/context"
import NavHeader from "../components/navHeader"
import MapNews from "../components/mapNews"
import { useContext } from "react"

export default function News() {
  window.scrollTo(0, 0)

  const { news, setNews } = useContext(NewsContext)
  changeTitle("Noticias")

  const visibleNews = news.filter(
    (news) => news.visible === true && news.category !== "Anuncios"
  )

  const lastNew = visibleNews[0]

  return (
    <>
      <NavHeader />

      <LastNews news={lastNew} />

      <MapNews news={visibleNews} setNews={setNews} />
    </>
  )
}
