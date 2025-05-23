import HTMLReactParser from "html-react-parser/lib/index"
import { DateIcon } from "./icons"

export default function NewsArticle({ news = {} }) {
  const { category, date, author, content, description, title, views } = news

  return (
    <article className="min-h-screen max-w-[1100px] mx-auto px-2 ">
      <section className="border-y p-4 mb-4 bg-[#f9fafb] flex justify-between items-center">
        <div className="flex items-center gap-2">
          {author?.avatar && (
            <img
              src={author.avatar}
              alt={`Autor ${author.name}`}
              className="w-7 h-7 rounded-full border"
            />
          )}
          <p className="text-base font-medium">{author?.name}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DateIcon size={18} />
          <span className="text-sm">{date}</span>
        </div>
      </section>
      <section className="flex items-center justify-between px-2 mb-3">
        <span>{views} visualizaciones</span>
        <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
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
        <h1 className="text-3xl font-extrabold tracking-wider uppercase text-gray-800 text-center p-2 ">
          {title}
        </h1>
        <p className="italic text-base text-[#4b5563] mb-20 mt-5 text-center">
          {description}
        </p>
        {content ? HTMLReactParser(content) : ""}
      </section>
    </article>
  )
}
