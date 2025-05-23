import { NewsContext } from "../context/context"
import { useContext } from "react"
import { Link } from "react-router"

export default function Categorys() {
  const { categorys } = useContext(NewsContext)

  return (
    <>
      <section className="my-15">
        <ul className="flex flex-wrap justify-center items-center gap-3 mb-4 ">
          {categorys.map((category, index) => (
            <li
              key={index}
              className="decoration-blue-500 hover:text-black border-b-2 border-gray-700 p-0"
            >
              <Link
                to={
                  category === "Anuncios"
                    ? "/anuncios"
                    : `/noticias/${category}`
                }
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
