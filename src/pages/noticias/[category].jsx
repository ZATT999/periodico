import NavHeader from "../../components/navHeader"
import { changeTitle } from "../../utils/changeTitle"
import LastNews from "../../components/lastNews"
import { Link, useParams } from "react-router"
import MapNews from "../../components/mapNews"
import { AdvertisementsCard } from "../../components/advertisementsCard"

export default function CategorysId({ allNews }) {
  window.scrollTo(0, 0)
  const params = useParams()
  changeTitle(`Noticias - ${params.category}`)

  const news = allNews.filter(
    (newsItem) => newsItem.category === params.category
  )
  const advertisements = allNews.filter(
    (newsItem) => newsItem.category === "Anuncios"
  )

  if (news.length === 0) {
    return (
      <main>
        <NavHeader />
        <h1 className="text-3xl text-center">
          No hay noticias para la categoria de {params.category}
        </h1>
        <p className="text-center my-10 font-bold text-gray-600">
          <Link to="/">Ir a la página principal</Link>
        </p>
      </main>
    )
  }

  return (
    <main>
      <NavHeader />
      <AdvertisementsCard
        key={news.id}
        advertisements={
          advertisements[(Math.random() * advertisements.length) | 0]
        }
      />

      <LastNews
        news={news[0]}
        title={`Ultimas Noticias - ${params.category}`}
      />
      <MapNews news={news} category={params.category} />
    </main>
  )
}
