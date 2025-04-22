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
    <article className="bg-[#fef9f4] min-h-screen max-w-[800px] px-6 sm:px-16 py-16 font-sans text-[#1e1b18] transition-all duration-300">
      <button
        onClick={handleClick}
        className="text-blue-300 hover:text-blue-200 text-base font-semibold mb-10 transition-colors duration-200 cursor-pointer"
      >
        ← Volver al inicio
      </button>
      <h1 className="text-4xl sm:text-5xl font-black text-[#1e1b18] mb-4 leading-snug drop-shadow-sm text-center">
        DIARIO CTE: <span className="text-blue-500">Visión empresarial</span>
      </h1>
      <header className=" space-y-1">
        <div className="flex items-center justify-between px-4 py-5 ">
          <p className="text-xl text-[#78716c] italic">
            El periódico favorito del colegio
          </p>
          <p className="text-sm">
            <span className="font-bold text-[#1e1b18]">Categoría:</span>{" "}
            <span className="bg-blue-400  px-2 py-1 rounded-full">
              {category}
            </span>
          </p>
        </div>
        <div className="flex justify-between px-4 py-5 bg-blue-50 ">
          <div className="flex items-center gap-4 ">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={`Autor ${author.name}`}
                className="w-8 h-8 rounded-full border-2 border-blue-800 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 bg-[#e2e8f0] rounded-full flex items-center justify-center text-[#64748b] text-lg font-bold">
                Img
              </div>
            )}
            <p className="text-lg font-semibold text-[#1e1b18]">
              {author?.name}
            </p>
          </div>
          <span className="text-xl flex gap-1 items-center">
            <DateIcon size={20} /> {date}
          </span>
        </div>
      </header>
      <hr className="border-t border-[#e4e4e7] mb-10" />
      <section className="prose lg:prose-xl max-w-4xl prose-h1:text-[#f97316] prose-h2:text-[#f97316] prose-p:text-[#1e1b18] prose-img:rounded-xl prose-a:text-[#ea580c]">
        {content ? HTMLReactParser(content) : ""}
      </section>
    </article>
  )
}
