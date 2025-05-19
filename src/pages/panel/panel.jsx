import { deleteNews, toggleVisibility } from "../../services/newsService"
import { createUser } from "../../services/UserServices"
import { changeTitle } from "../../utils/changeTitle"
import { NewsContext } from "../../context/context"
import { useContext, useRef } from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import {
  DeleteIcon,
  EditIcon,
  OpenLockIcon,
  OpenLockOffIcon,
} from "../../components/icons"

export default function Panel() {
  const { news, setNews } = useContext(NewsContext)
  const userCreatedRef = useRef()

  changeTitle("Panel de Administración")

  const openDialog = (ref) => ref.current?.showModal()
  const closeDialog = (ref) => ref.current?.close()

  const handleCreateUser = async (e) => {
    e.preventDefault()
    const id = e.target.elements.id.value
    const name = e.target.elements.name.value

    try {
      const res = await createUser({ id, name })

      if (res.status === 201) toast.success("Usuario creado correctamente")
      if (res.status === 409)
        toast.error("Documento de identidad o nombre ya existentes")
      if (res.status === 500) toast.error("Error inesperado al crear usuario")
    } catch (error) {
      toast.error("Error inesperado al crear usuario")
    } finally {
      e.target.reset()
    }
    closeDialog(userCreatedRef)
  }

  const handleDelete = (id) => {
    setNews((prevNews) => prevNews.filter((item) => item.id !== id))
    deleteNews(id)
    toast.success("Noticia eliminada")
  }

  const handleVisible = (id) => {
    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    )
    toggleVisibility(id)
    toast.info("Visibilidad cambiada")
  }

  return (
    <>
      <header className="py-6 mb-2 text-center">
        <h1 className="text-4xl ml:text-5xl md:text-6xl font-serif font-bold uppercase tracking-wider leading-tight">
          CTE: Visión Empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <h3 className="text-2xl border-y py-3 pl-5 bg-[#f9fafb] md:text-3xl font-semibold font-serif mb-20">
        Panel de Administración
      </h3>

      <div className="flex justify-center mb-20 gap-4">
        <Link to="/admin/panel/create">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 cursor-pointer">
            Crear Noticia
          </button>
        </Link>
        <button
          onClick={() => openDialog(userCreatedRef)}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          Crear Usuario
        </button>
      </div>

      <dialog
        ref={userCreatedRef}
        className="p-6 w-96 rounded-lg border border-blue-300 shadow-lg m-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input
            type="number"
            name="id"
            placeholder="Documento de Identidad"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => closeDialog(userCreatedRef)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Crear
            </button>
          </div>
        </form>
      </dialog>

      <section className="mansory px-2 md:px-5 ">
        {news.map((newsItem) => (
          <article
            key={newsItem.id}
            className="group w-auto h-auto group rounded-lg overflow-hidden shadow-md border-1 border-blue-200 hover:scale-101 transition-transform duration-300 mb-5"
          >
            <Link to={`/noticia/${newsItem.id}`}>
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="w-full flex flex-col gap-4 px-4 py-5 bg-blue-50 ">
              <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
              <div className="flex items-center justify-between mt-3">
                <img
                  src={newsItem.author.avatar}
                  alt={newsItem.author.name}
                  className="w-7 h-7 rounded-full border-1 border-blue-500"
                />
                <div className="flex gap-3">
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(newsItem.id)}
                  >
                    <DeleteIcon size={30} />
                  </button>
                  <Link
                    to={`/admin/panel/news/${newsItem.id}`}
                    className="text-blue-500"
                  >
                    <EditIcon size={30} />
                  </Link>
                  <button onClick={() => handleVisible(newsItem.id)}>
                    {newsItem.visible ? (
                      <span className="text-green-500 cursor-pointer">
                        <OpenLockIcon size={30} />
                      </span>
                    ) : (
                      <span className="text-red-500 cursor-pointer">
                        <OpenLockOffIcon size={30} />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
