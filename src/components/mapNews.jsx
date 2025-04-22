import { Link } from "react-router"
import { useContext } from "react"
import { NewsContext } from "../context/context"
import { DateIcon } from "./icons"

export default function MapNews() {
  const { news } = useContext(NewsContext)

  const getNewsVisible = news.filter((news) => news.visible === true)

  return (
    <div className=" min-h-screen px-6 py-10">
      <h1 className="text-2xl font-bold text-black mb-6">Últimas noticias</h1>

      <section className="mansory mx-auto">
        {getNewsVisible.map((news) => (
          <Link to={`/noticia/${news.id}`} key={news.id}>
            <article className="w-[250px] h-auto  mb-[10px]  rounded-2xl overflow-hidden shadow-md border-[2px] border-blue-200 transition-transform hover:scale-101 duration-200 ">
              <img
                src={news.image}
                alt="Evento"
                className="w-full h-full object-cover "
              />
              <div className="w-full flex flex-col gap-4 px-4 py-5 bg-blue-50 ">
                <h3 className="text-[15px] font-semibold text-black">
                  {news.title}
                </h3>

                <div className="flex justify-between items-center  mt-3">
                  <img
                    src={news.author.avatar}
                    alt={`${news.author.name}`}
                    className="w-7 h-7 rounded-full border-1 border-blue-500"
                  />

                  <span className="text-[17px] flex gap-1 items-center">
                    <DateIcon size={17} /> {news.date}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
