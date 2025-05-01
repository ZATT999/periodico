import { useParams } from "react-router"
import News from "../components/News"
import { NewsContext } from "../context/context"
import { useContext } from "react"
import { changeTitle } from "../utils/changeTitle"

export default function NewsId() {
  const params = useParams()
  const { news } = useContext(NewsContext)
  window.scrollTo(0, 0)
  const newsFilter = news.find((newsItem) => newsItem.id === params.slug)
  changeTitle(newsFilter.title)

  return (
    <>
      <News news={newsFilter} />
    </>
  )
}
