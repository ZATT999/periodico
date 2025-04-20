import { useNavigate } from "react-router"
import HTMLReactParser from "html-react-parser/lib/index"
import { useGetNews } from "../hooks/useGetNews"

export default function News({ id }) {
  const news = useGetNews(id)
  const { category, date, author, content } = news
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <article className="bg-white min-h-screen px-6 py-10 text-black font-sans">
      <h4
        onClick={handleClick}
        className="text-blue-600 hover:underline cursor-pointer mb-4 text-sm"
      >
        Inicio
      </h4>

      <h1 className="text-3xl font-bold text-black mb-2">
        DIARIO CTE: Visión empresarial
      </h1>

      <header className="border-b border-gray-200 pb-4 mb-6">
        <p className="text-gray-600">El periódico favorito del colegio</p>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-blue-600 mt-1">
          <strong className="text-black">Categoría:</strong> {category}
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          {author?.avatar && (
            <img
              src={author.avatar}
              alt={`Autor ${author.name}`}
              className="w-10 h-10 rounded-full border border-blue-500"
            />
          )}
          <p className="text-sm font-medium text-black">{author?.name}</p>
        </div>

        <div className="prose max-w-none prose-blue prose-sm sm:prose-base">
          {content ? HTMLReactParser(content) : ""}
        </div>
      </section>
    </article>
  )
}
