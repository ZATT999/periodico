import { Link, useParams } from "react-router"
import LastNews from "../components/ui/lastNews"
import NavHeader from "../components/ui/navHeader"
import MapNews from "../components/mapNews"

export default function CategorysId({ allNews }) {
  const params = useParams()

  const news = allNews.filter(
    (newsItem) => newsItem.category === params.category
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
      <LastNews
        news={news[0]}
        title={`Ultimas Noticias - ${params.category}`}
      />
      <MapNews news={news} title={`Noticias - ${params.category}`} />
    </main>
  )
}
