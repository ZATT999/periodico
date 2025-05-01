import { useNavigate } from "react-router"
import HTMLReactParser from "html-react-parser/lib/index"
import { DateIcon } from "./icons"

export default function News({ news = {} }) {
  const { category, date, author, content } = news
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <article className=" min-h-screen max-w-[1100px] mx-auto px-3  py-10 font-serif text-[#1e1b18]">
      <button
        onClick={handleClick}
        className="text-blue-500 hover:text-blue-700 text-sm font-medium mb-8 transition cursor-pointer"
      >
        ← Volver al inicio
      </button>

      <header className="border-y border-black py-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wider uppercase">
          CTE: Visión Empresarial
        </h1>
        <p className="italic text-base text-[#4b5563] mt-2">
          Infórmate bien, decide mejor
        </p>
      </header>

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b p-4 bg-[#f9fafb]">
        <div className="flex items-center gap-4">
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt={`Autor ${author.name}`}
              className="w-10 h-10 rounded-full border"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
              ?
            </div>
          )}
          <p className="text-lg font-medium">{author?.name}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 text-gray-600">
          <DateIcon size={18} />
          <span>{date}</span>
        </div>
        <div className="mt-4 sm:mt-0 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {category}
        </div>
      </section>

      <div className="text-center mb-12">
        <h2 className="uppercase text-lg sm:text-xl tracking-widest font-semibold border-y border-[#d1d5db] inline-block px-4 py-2 text-[#1f2937]">
          Un vistazo a nuestro contenido
        </h2>
      </div>

      <hr className="border-gray-300 my-6" />

      <section className="prose lg:prose-xl prose-h1:text-orange-600 prose-h2:text-orange-600 prose-p:text-[#111827] prose-img:rounded-xl prose-a:text-blue-700">
        {content ? HTMLReactParser(content) : ""}
      </section>
    </article>
  )
}
