import { Link } from "react-router"
import { DateIcon } from "./icons"

export default function LastNews({ news = {} }) {
  return (
    <>
      <h3 className="text-2xl bg-[#f9fafb] border-y py-3 pl-5 md:text-3xl font-semibold font-serif mb-4">
        Última Noticia
      </h3>

      <article className="flex flex-col justify-center p-3 md:flex-row gap-8 py-6 ">
        <div className="md:w-1/2">
          <Link to={`/noticia/${news.id}`}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase mb-2 leading-tight hover:text-sky-800 transition-all">
              {news.title}
            </h2>
          </Link>
          <div className="flex  gap-5">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={news.author?.avatar}
                alt={`Autor ${news.author?.name}`}
                className="w-7 h-7 rounded-full border"
              />
              <p className="text-sm font-medium">{news.author?.name}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <DateIcon size={18} /> {news.date}
            </p>
          </div>

          <p className="text-lg leading-relaxed mb-4">{news.description}</p>
        </div>
        <Link
          to={`/noticia/${news.id}`}
          className="overflow-hidden h-[300px] max-w-[400px] m-auto rounded shadow-md"
        >
          <img
            src={news.image}
            alt={news.title}
            className="object-cover rounded h-[300px] max-w-[400px] w-full hover:scale-105 transition-all duration-300"
          />
        </Link>
      </article>
    </>
  )
}
