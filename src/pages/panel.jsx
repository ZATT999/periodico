import { NewsContext, UserContext } from "../context/context"
import { useContext, useState, useRef } from "react"
import { getDate } from "../utils/getDate"
import Headers from "../components/header"
import { Link } from "react-router"
import {
  DeleteIcon,
  EditIcon,
  OpenLockIcon,
  OpenLockOffIcon,
} from "../components/icons"
import {
  createNews,
  deleteNews,
  updateNews,
  toggleVisibility,
} from "../services/newsService"
import { createUser } from "../services/UserServices"
import { toast, Toaster } from "sonner" // <--- Añadido aquí

export default function Panel() {
  const { user } = useContext(UserContext)
  const { news, setNews } = useContext(NewsContext)
  const [idNewsEdit, setIdNewsEdit] = useState("")
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    content: "",
  })

  const createNewsRef = useRef()
  const editNewsRef = useRef()
  const userCreatedRef = useRef()

  const openDialog = (ref) => ref.current?.showModal()
  const closeDialog = (ref) => ref.current?.close()

  const prepareEdit = (id) => {
    const newsToEdit = news.find((item) => item.id === id)
    if (newsToEdit) {
      setIdNewsEdit(id)
      setEditFormData({
        title: newsToEdit.title,
        description: newsToEdit.description,
        category: newsToEdit.category,
        image: newsToEdit.image,
        content: newsToEdit.content,
      })
      openDialog(editNewsRef)
    }
  }

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
    }
    closeDialog(userCreatedRef)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreate = (e) => {
    e.preventDefault()

    const title = e.target.elements.title.value
    const description = e.target.elements.description.value
    const category = e.target.elements.category.value
    const image = e.target.elements.image.value
    const content = e.target.elements.content.value
    const author = { name: user.name, avatar: user.avatar }
    const id = crypto.randomUUID()
    const date = getDate

    const newNews = {
      title,
      description,
      category,
      image,
      content,
      author,
      date,
      id,
      visible: true,
    }

    setNews((prevNews) => [...prevNews, newNews])
    createNews(newNews)
    toast.success("Noticia creada exitosamente")
    closeDialog(createNewsRef)
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

  const handleEdit = (e) => {
    e.preventDefault()

    const { title, description, category, image, content } = editFormData

    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === idNewsEdit
          ? { ...item, title, description, category, image, content }
          : item
      )
    )
    updateNews(idNewsEdit, { title, description, category, image, content })
    toast.success("Noticia editada correctamente")
    closeDialog(editNewsRef)
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Panel de Noticias
      </h1>

      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => openDialog(createNewsRef)}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Crear Noticia
        </button>
        <button
          onClick={() => openDialog(userCreatedRef)}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
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
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Crear
            </button>
          </div>
        </form>
      </dialog>

      <dialog
        ref={createNewsRef}
        className="p-6 w-96 rounded-lg border border-blue-300 shadow-lg m-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Crear Noticia
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="URL de Imagen"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="content"
            placeholder="Contenido"
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="5"
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => closeDialog(createNewsRef)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Crear
            </button>
          </div>
        </form>
      </dialog>

      <dialog
        ref={editNewsRef}
        className="p-6 w-96 rounded-lg border border-blue-300 shadow-lg m-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Editar Noticia</h2>
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="category"
            value={editFormData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="image"
            value={editFormData.image}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="content"
            value={editFormData.content}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="5"
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => closeDialog(editNewsRef)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </dialog>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((newsItem) => (
          <article
            key={newsItem.id}
            className="rounded-lg overflow-hidden shadow-md border-2 border-blue-200 hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/noticia/${newsItem.id}`}>
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4 bg-blue-50">
              <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
              <div className="flex items-center justify-between">
                <img
                  src={newsItem.author.avatar}
                  alt={newsItem.author.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-400"
                />
                <div className="flex gap-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(newsItem.id)}
                  >
                    <DeleteIcon size={20} />
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => prepareEdit(newsItem.id)}
                  >
                    <EditIcon size={20} />
                  </button>
                  <button onClick={() => handleVisible(newsItem.id)}>
                    {newsItem.visible ? (
                      <span className="text-green-500">
                        <OpenLockIcon size={20} />
                      </span>
                    ) : (
                      <span className="text-red-500">
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
    </>
  )
}
