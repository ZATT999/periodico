import { Link } from "react-router"
import { DateIcon } from "./icons"

export function AdvertisementsCard({ advertisements }) {
  return (
    <>
      <article className="flex flex-col  bg-blue-50 mb-10  shadow-md gap-4 p-2 border-t-10 border-blue-400">
        <div className="flex gap-2 items-center justify-end">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <DateIcon size={18} /> {advertisements.date}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row ">
          <div className="md:w-1/2">
            <Link to={`/noticia/${advertisements.id}`}>
              <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase mb-2 leading-tight hover:text-sky-900 transition-all">
                {advertisements.title}
              </h2>
            </Link>

            <p className="text-lg leading-relaxed mb-4 pr-5">
              {advertisements.description}
            </p>
          </div>
          <Link
            to={`/noticia/${advertisements.id}`}
            className="overflow-hidden hidden max-h-[200px] max-w-[300px] rounded m-auto sm:flex"
          >
            <img
              src={advertisements.image}
              alt={advertisements.title}
              className="object-cover rounded max-h-[200px] max-w-[300px] w-full h-full hover:scale-105 transition-all duration-300 shadow-md"
            />
          </Link>
        </div>
      </article>
    </>
  )
}
