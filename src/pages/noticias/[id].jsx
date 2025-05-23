import NewsArticle from "../../components/newsArticle"
import { NewsContext } from "../../context/context"
import { changeTitle } from "../../utils/changeTitle"
import { useParams } from "react-router"
import { useContext } from "react"
import { Commentarys } from "../../components/commentarys"

export default function NewPage() {
  const { news } = useContext(NewsContext)
  const params = useParams()

  const newsFilter = news.find((newsItem) => newsItem.id === params.id)

  changeTitle(newsFilter?.title)
  window.scrollTo(0, 0)

  return (
    <>
      <NewsArticle news={newsFilter} />
      <div className="mt-10 flex justify-center">
        <Commentarys
          InitialCommentarys={newsFilter?.commentarys}
          id={newsFilter.id}
        />
      </div>
    </>
  )
}
