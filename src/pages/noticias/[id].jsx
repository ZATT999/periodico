import NewsArticle from "../../components/newsArticle"
import { NewsContext } from "../../context/context"
import { changeTitle } from "../../utils/changeTitle"
import { useParams } from "react-router"
import { useContext, useEffect } from "react"
import { Commentarys } from "../../components/commentarys"
import NavHeader from "../../components/navHeader"
import { AdvertisementsCard } from "../../components/advertisementsCard"
import { addVisited } from "../../services/newsService"

export default function NewPage() {
  const { news } = useContext(NewsContext)
  const params = useParams()

  const newsFilter = news.find((newsItem) => newsItem.id === params.id)
  const advertisements = news.filter(
    (newsItem) => newsItem.category === "Anuncios"
  )

  useEffect(() => {
    window.scrollTo(0, 0)

    addVisited(newsFilter?.id)
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }, [])

  changeTitle(newsFilter?.title)

  return (
    <>
      <NavHeader />
      <AdvertisementsCard
        key={news.id}
        advertisements={
          advertisements[(Math.random() * advertisements.length) | 0]
        }
      />
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
