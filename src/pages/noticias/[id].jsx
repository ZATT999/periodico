import NewsArticle from "../../components/newsArticle"
import { NewsContext } from "../../context/context"
import { changeTitle } from "../../utils/changeTitle"
import { useParams } from "react-router"
import { useContext } from "react"
import { Commentarys } from "../../components/commentarys"
import NavHeader from "../../components/navHeader"
import { AdvertisementsCard } from "../../components/advertisementsCard"

export default function NewPage() {
  const { news } = useContext(NewsContext)
  const params = useParams()

  const newsFilter = news.find((newsItem) => newsItem.id === params.id)
  const advertisements = news.filter(
    (newsItem) => newsItem.category === "Anuncios"
  )

  changeTitle(newsFilter?.title)
  window.scrollTo(0, 0)

  return (
    <>
      <NavHeader />
      <AdvertisementsCard key={news.id} advertisements={advertisements[0]} />
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
