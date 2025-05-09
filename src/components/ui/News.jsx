import { useNavigate } from "react-router"
import HTMLReactParser from "html-react-parser/lib/index"
import { DateIcon } from "./icons"

export default function News({ news = {} }) {
  const { category, date, author, content } = news

  return (
    <article className="min-h-screen max-w-[1100px] mx-auto px-3 py-15 font-serif text-[#1e1b18]">
      <header className="border-b border-black pb-6 text-center">
        <h1 className="text-2xl @[250px]:text-3xl ml:text-5xl md:text-6xl font-extrabold tracking-wider uppercase text-gray-800">
          CTE: Visión Empresarial
        </h1>
        <p className="italic text-base text-[#4b5563] mt-2">
          Infórmate bien, decide mejor
        </p>
      </header>

      <section className="border-y  p-4 mb-10 bg-[#f9fafb] flex justify-between items-center">
        <div className="flex items-center gap-2 ">
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
        {content ? HTMLReactParser(content) : ""}
      </section>
    </article>
  )
}
