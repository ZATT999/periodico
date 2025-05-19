import { Link } from "react-router"
import { DateIcon } from "./icons"

export default function NewsCard({ news }) {
  const { date, author, title, id, image } = news

  return (
    <Link to={`/noticia/${id}`}>
      <article className="group w-auto h-auto mb-[10px] rounded-2xl overflow-hidden shadow-md border-1 border-blue-200 transition-transform hover:scale-101 duration-200 ">
        <img
          src={image}
          alt="Evento"
          className="w-full h-full  max-h-[300px] object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="w-full flex flex-col gap-4 px-4 py-5 bg-blue-50 ">
          <h3 className="text-[15px] font-semibold text-black">{title}</h3>

          <div className="flex justify-between items-center  mt-3">
            <img
              src={author.avatar}
              alt={`${author.name}`}
              className="w-7 h-7 rounded-full border-1 border-blue-500"
            />

            <span className="text-[17px] flex gap-1 items-center">
              <DateIcon size={17} /> {date}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
