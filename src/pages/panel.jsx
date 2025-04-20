import { useContext, useState } from "react"
import { NewsContext, UserContext } from "../context/context"
import { Link } from "react-router"
import { getDate } from "../utils/getDate"
import {
  DeleteIcon,
  EditIcon,
  OpenLockIcon,
  OpenLockOffIcon,
} from "../components/icons"

export default function Panel() {
  const { user } = useContext(UserContext)
  const { news, setNews } = useContext(NewsContext)
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
    const id = crypto.randomUUID()

    setNews((news) => [
      ...news,
      { title, description, category, image, content, author, date },
    ])

    fetch("http://localhost:3000/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
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
      .finally(() => document.querySelector("#create").close())
  }

  const handleDelete = (id) => {
    setNews((news) => news.filter((newsItem) => newsItem._id !== id))

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
    setNews((news) =>
      news.map((newsItem) =>
        newsItem._id === id
          ? { ...newsItem, visible: !newsItem.visible }
          : newsItem
      )
    )

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
    setNews((news) =>
      news.map((newsItem) =>
        newsItem._id === idNewsEdit
          ? { ...newsItem, title, description, category, image, content }
          : newsItem
      )
    )

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
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => document.querySelector("#create").close())
  }

  return (
    <main className="bg-white min-h-screen px-6 py-10 text-black">
      <div className="flex flex-col items-center justify-center my-15">
        <h1 className="text-5xl font-bold mb-15 text-center">
          Panel de noticias
        </h1>

        <button
          onClick={() => document.querySelector("#create").showModal()}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Crear noticia
        </button>
      </div>

      <dialog
        id="create"
        className="modal border-2 border-blue-100 bg-white m-auto p-10 rounded-lg shadow-xl shadow-gray-600 w-full max-w-xl"
      >
        <h2 className="text-3xl font-semibold mb-5 text-center">
          Crear noticia
        </h2>
        <form
          method="dialog"
          className="modal-box space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Título"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-1 px-2 outline-none"
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-1 px-2 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Categoría"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-1 px-2 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Imagen"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-1 px-2 outline-none"
            required
          />
          <textarea
            placeholder="Contenido"
            className="textarea textarea-bordered resize-none w-full h-40 border-2  border-blue-100 rounded-xl p-1 px-2 outline-none"
            required
          />
          <div className="flex justify-end gap-3 mt-1">
            <button
              type="button"
              onClick={() => document.querySelector("#create").close()}
              className="btn btn-ghost cursor-pointer  bg-red-500 text-white p-1 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary cursor-pointer  bg-green-500 text-white p-1 rounded-md"
            >
              Crear
            </button>
          </div>
        </form>
      </dialog>

      <dialog
        id="edit"
        className="modal border-2 border-blue-100 bg-white m-auto p-10 rounded-lg shadow-xl shadow-gray-600 w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Editar noticia
        </h2>
        <form
          method="dialog"
          className="modal-box space-y-4"
          onSubmit={handleEdit}
        >
          <input
            type="text"
            placeholder="Título"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Categoría"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Imagen"
            className="input input-bordered w-full border-2 border-blue-100 rounded-xl p-2 outline-none"
            required
          />
          <textarea
            placeholder="Contenido"
            className="textarea textarea-bordered resize-none w-full h-40 border-2  border-blue-100 rounded-xl p-1 px-2 outline-none"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => document.querySelector("#edit").close()}
              className="btn btn-ghost  cursor-pointer  bg-red-500 text-white p-1 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary  cursor-pointer  bg-green-500 text-white p-1 rounded-md"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </dialog>

      <section className="mansory mx-auto">
        {news.map((newsItem) => (
          <article
            className="w-[250px] h-auto  mb-[10px]  rounded-2xl overflow-hidden shadow-md border-[2px] border-blue-200 transition-transform hover:scale-101 duration-200 "
            key={newsItem._id}
          >
            <Link to={`/noticia/${newsItem._id}`} className="block">
              <img
                src={newsItem.image}
                alt="Evento"
                className="w-full h-40 object-cover "
              />
            </Link>
            <div className="p-4 bg-blue-50 ">
              <h3 className="text-lg font-semibold">{newsItem.title}</h3>
              <div className="flex gap-2 items-center justify-between mt-3">
                <img
                  src={newsItem.author.avatar}
                  alt="Autor"
                  className="w-7 h-7 rounded-full border-1 border-blue-500"
                />
                <div className="flex gap-3 items-center justify-end ">
                  <button
                    onClick={() => handleDelete(newsItem._id)}
                    className="text-red-600 hover:underline text-sm cursor-pointer"
                  >
                    <DeleteIcon size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setIdNewsEdit(newsItem._id)
                      document.querySelector("#edit").showModal()
                    }}
                    className="text-blue-600 hover:underline text-sm cursor-pointer"
                  >
                    <EditIcon size={20} />
                  </button>
                  <button
                    onClick={() => handleVisible(newsItem._id)}
                    className="text-black hover:underline text-sm cursor-pointer"
                  >
                    {newsItem.visible ? (
                      <span className="text-green-400">
                        <OpenLockIcon size={20} />
                      </span>
                    ) : (
                      <span className="text-red-400">
                        <OpenLockOffIcon size={20} />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
