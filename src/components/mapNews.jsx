import { Link } from "react-router"
import Masonry from "react-masonry-css"
import { useContext } from "react"
import { NewsContext } from "../context/context"

export default function MapNews() {
  const { news } = useContext(NewsContext)

  const getNewsVisible = news.filter((news) => news.visible === true)

  return (
    <div className="bg-white min-h-screen px-6 py-10">
      <h1 className="text-2xl font-bold text-black mb-6">Últimas noticias</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {getNewsVisible.map((news) => (
          <Link to={`/noticia/${news._id}`} key={news._id}>
            <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-md border border-gray-200 transition-transform hover:scale-105 duration-200">
              <img
                src={news.image}
                alt="Evento"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/90 to-transparent px-4 py-3">
                <h3 className="text-sm font-semibold text-black">
                  {news.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
