import { useContext } from "react"
import MapNews from "../components/mapNews"
import { NewsContext } from "../context/context"
import { Link } from "react-router"

export default function NewsPage() {
  const { news } = useContext(NewsContext)

  const mainNews = news[0]

  return (
    <>
      <header className="py-6 mb-2 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold uppercase tracking-wider leading-tight">
          CTE: Visión Empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <h3 className="text-2xl border-y py-3 pl-5 md:text-3xl font-semibold font-serif mb-4">
        Última Noticia
      </h3>

      <article className="flex flex-col justify-center p-3 md:flex-row gap-8 py-6 ">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase mb-2 leading-tight">
            {mainNews?.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{mainNews?.date}</p>
          <p className="text-lg leading-relaxed mb-4">
            {mainNews?.description}
          </p>
        </div>
        <Link to={`/noticia/${mainNews?.id}`}>
          <img
            src={mainNews?.image}
            alt={mainNews?.title}
            className="w-full h-[400px] max-w-[400px] m-auto object-cover rounded shadow-md"
          />
        </Link>
      </article>

      <MapNews />
    </>
  )
}
