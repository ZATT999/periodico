import { useContext, useState } from "react"
import { NewsContext, UserContext } from "../context/context"
import { Link } from "react-router"
import { getDate } from "../utils/getDate"

export default function Panel() {
  const { user } = useContext(UserContext)
  const { news } = useContext(NewsContext)
  const [idNewsEdit, setIdNewsEdit] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const date = getDate
    const title = e.target.elements[0].value
    const description = e.target.elements[1].value
    const category = e.target.elements[2].value
    const image = e.target.elements[3].value
    const content = e.target.elements[4].value
    const author = { name: user.name, avatar: user.avatar }

    fetch("http://localhost:3000/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        image,
        content,
        author,
        date,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/news/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  const handleVisible = (id) => {
    fetch(`http://localhost:3000/api/news/${id}/visible`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  const handleEdit = (e) => {
    e.preventDefault()
    const title = e.target.elements[0].value
    const description = e.target.elements[1].value
    const category = e.target.elements[2].value
    const image = e.target.elements[3].value
    const content = e.target.elements[4].value

    fetch(`http://localhost:3000/api/news/${idNewsEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        image,
        content,
      }),
    })
  }

  return (
    <main className="bg-white min-h-screen px-6 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Panel de noticias</h1>

      <button
        onClick={() => document.querySelector("#create").showModal()}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Crear noticia
      </button>

      {/* Modal Crear */}
      <dialog id="create" className="modal modal-open">
        <form
          method="dialog"
          className="modal-box space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-2">Crear noticia</h2>
          <input
            type="text"
            placeholder="Título"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Categoría"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Imagen"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Contenido"
            className="textarea textarea-bordered w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => document.querySelector("#create").close()}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </div>
        </form>
      </dialog>

      {/* Modal Editar */}
      <dialog id="edit" className="modal modal-open">
        <form
          method="dialog"
          className="modal-box space-y-4"
          onSubmit={handleEdit}
        >
          <h2 className="text-xl font-semibold mb-2">Editar noticia</h2>
          <input
            type="text"
            placeholder="Título"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Categoría"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Imagen"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Contenido"
            className="textarea textarea-bordered w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => document.querySelector("#edit").close()}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar cambios
            </button>
          </div>
        </form>
      </dialog>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((newsItem) => (
          <div
            className="border border-gray-200 rounded-xl p-4 shadow-sm space-y-2"
            key={newsItem._id}
          >
            <Link to={`/noticia/${newsItem._id}`} className="block">
              <img
                src={newsItem.image}
                alt="Evento"
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{newsItem.title}</h3>
              <p className="text-sm text-gray-600">
                {newsItem.visible ? "Publicada" : "No publicada"}
              </p>
            </Link>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleDelete(newsItem._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Borrar
              </button>
              <button
                onClick={() => {
                  setIdNewsEdit(newsItem._id)
                  document.querySelector("#edit").showModal()
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleVisible(newsItem._id)}
                className="text-black hover:underline text-sm"
              >
                Cambiar visibilidad
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
