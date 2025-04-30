import { useParams } from "react-router"
import News from "../components/News"
import { NewsContext } from "../context/context"
import { useContext } from "react"

export default function NewsId() {
  const params = useParams()
  const { news } = useContext(NewsContext)
  window.scrollTo(0, 0)

  const newsFilter = news.find((newsItem) => newsItem.id === params.slug)

  return (
    <>
      <News news={newsFilter} />
    </>
  )
}
