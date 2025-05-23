import { toast } from "sonner"
import { DeleteIcon, SentIcon } from "./icons"
import { useContext, useState } from "react"
import { UserContext } from "../context/context"
import { createCommentary, deleteCommentary } from "../services/newsService"
import { getDateHour } from "../utils/getDate"
import { Link } from "react-router"

export function Commentarys({ InitialCommentarys, id }) {
  const { user } = useContext(UserContext)
  const [commentarys, setCommentarys] = useState(InitialCommentarys ?? [])

  const handleDelete = (Commentaryid) => {
    setCommentarys((prevCommentarys) =>
      prevCommentarys.filter((commentary) => commentary.id !== Commentaryid)
    )

    deleteCommentary(id, Commentaryid)
      .then((res) => {
        if (res.ok) return toast.success("Comentario eliminado exitosamente")
      })
      .catch((error) => {
        console.error("Error al eliminar el comentario:", error)
        return toast.error("Error al eliminar el comentario")
      })
  }

  const handleSumit = (e) => {
    e.preventDefault()
    const commentary = {
      author: { name: user.name, avatar: user.avatar },
      date: getDateHour,
      content: e.target.elements.commentary.value,
      id: crypto.randomUUID(),
    }

    setCommentarys((prevCommentarys) => [commentary, ...prevCommentarys])
    e.target.elements.commentary.value = ""

    createCommentary(commentary, id)
      .then((res) => {
        if (res.ok) return toast.success("Comentario creado exitosamente")
      })
      .catch((error) => {
        console.error("Error al crear el comentario:", error)
        return toast.error("Error al crear el comentario")
      })
  }

  return (
    <section className="flex flex-col w-full h-auto border-t-1 border-gray-300">
      {!user ? (
        <div className="flex gap-1 justify-center bg-blue-50 p-4 w-full h-auto">
          <h5 className="text-center font-semibold">
            No estas logeado! Por favor,{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              inicia sesión
            </Link>{" "}
            para comentar
          </h5>
        </div>
      ) : (
        <form onSubmit={handleSumit} className="flex gap-1 items-center">
          <textarea
            className="w-full h-11 min-h-10 max-h-40 mt-4 border-b-2 border-gray-400 px-4 py-2 bg-gray-100 outline-none resize-y"
            placeholder="Escribe tu comentario"
            name="commentary"
            required
          />
          <button className=" text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded-lg mt-2 mr-3 w-[30px] h-[30px] cursor-pointer">
            <SentIcon size={24} />
          </button>
        </form>
      )}

      {commentarys.length > 0 ? (
        commentarys.map((commentary) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 mt-4 w-full h-auto"
            key={commentary.id}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  src={commentary.author.avatar}
                  alt={commentary.author.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm font-medium">
                    {commentary.author.name}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500">{commentary.date}</div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm mt-4">{commentary.content}</p>
              {user.name === commentary.author.name || user.isAdmin ? (
                <button
                  type="button"
                  onClick={() => handleDelete(commentary.id)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  <DeleteIcon size={20} />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No hay comentarios, crea uno!
        </p>
      )}
    </section>
  )
}
