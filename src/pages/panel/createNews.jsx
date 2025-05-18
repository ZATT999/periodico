import { NewsContext, UserContext } from "../../context/context"
import { createNews } from "../../services/newsService"
import { changeTitle } from "../../utils/changeTitle"
import { Link, useNavigate } from "react-router"
import { getDate } from "../../utils/getDate"
import { useContext, useState } from "react"
import { toast } from "sonner"
import {
  ArrowDownIcon,
  ArrowNarrowLeft,
  ArrowUpIcon,
  DeleteIcon,
} from "../../components/ui/icons"

export default function CreateNews() {
  const { categorys } = useContext(NewsContext)
  const { user } = useContext(UserContext)
  const { setNews } = useContext(NewsContext)
  const navigate = useNavigate()
  window.scrollTo(0, 0)
  changeTitle("Crear Noticia")

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  })

  const [blocks, setBlocks] = useState([])
  const [isPreview, setIsPreview] = useState(false) // Estado para alternar vista previa

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addBlock = (type) => {
    setBlocks([...blocks, { id: crypto.randomUUID(), type, content: "" }])
  }

  const updateBlock = (id, value) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, content: value } : block
      )
    )
  }

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  const moveBlock = (id, direction) => {
    const index = blocks.findIndex((b) => b.id === id)
    if (
      index < 0 ||
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    )
      return

    const newBlocks = [...blocks]
    const [moved] = newBlocks.splice(index, 1)
    newBlocks.splice(direction === "up" ? index - 1 : index + 1, 0, moved)
    setBlocks(newBlocks)
  }

  const generateHTML = () => {
    const blockStyles = {
      title:
        'style="color: black; font-size: 40px; text-align: center; font-weight: bold;"',
      subtitle:
        'style="font-size: 1.5rem; margin-top: 1.5em; color: rgb(71, 85, 105);"',
      paragraph: 'style="line-height: 1.7;"',
      image: 'style="max-width: 100%; border-radius: 12px; margin: 1em 0px;"',
      list: 'style="margin-left: 2em; list-style-type: disc;"',
      quote:
        'style="background: rgb(241, 245, 249); border-left: 4px solid rgb(148, 163, 184); padding: 1em; margin: 2em 0px; color: rgb(71, 85, 105);"',
    }

    return blocks
      .map((block) => {
        const style = blockStyles[block.type] || ""
        switch (block.type) {
          case "title":
            return `<h1 ${style}>${block.content}</h1>`
          case "subtitle":
            return `<h3 ${style}>${block.content}</h3>`
          case "paragraph":
            return `<p ${style}>${block.content}</p>`
          case "image":
            return `<img src="${block.content}" alt="" ${style} />`
          case "list":
            return `<ul ${style}>${block.content
              .split("\n")
              .map((li) => `<li >${li}</li>`)
              .join("")}</ul>`
          case "quote":
            return `<blockquote ${style}>${block.content}</blockquote>`
          default:
            return ""
        }
      })
      .join("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const html = `
      <div style="font-family: Georgia, serif; color: rgb(30, 27, 24); line-height: 1.7;">
        ${generateHTML()}
      </div>
    `

    const newsData = {
      ...form,
      content: html,
      date: getDate,
      author: { name: user.name, avatar: user.avatar },
      id: crypto.randomUUID(),
    }

    createNews(newsData)
      .then(() => {
        navigate("/admin/panel")
        toast.success("Noticia creada exitosamente")
      })
      .catch((error) => {
        console.error("Error al crear la noticia:", error)
        toast.error("Error al crear la noticia")
      })
    setNews((prevNews) => [newsData, ...prevNews])
  }

  const renderBlock = (block) => {
    const placeholders = {
      title: "Título",
      subtitle: "Subtítulo",
      paragraph: "Párrafo",
      image: "URL de la imagen",
      list: "Lista (una línea por elemento)",
      quote: "Cita",
    }

    return (
      <div key={block.id} className="border p-2 rounded bg-gray-50 mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="capitalize font-medium">
            {placeholders[block.type]}
          </span>
          <div className="space-x-2">
            <button type="button" onClick={() => moveBlock(block.id, "up")}>
              <span className=" text-blue-400">
                <ArrowUpIcon />
              </span>
            </button>
            <button type="button" onClick={() => moveBlock(block.id, "down")}>
              <span className="text-blue-400 ">
                <ArrowDownIcon />
              </span>
            </button>
            <button type="button" onClick={() => removeBlock(block.id)}>
              <span className="text-red-500">
                <DeleteIcon />
              </span>
            </button>
          </div>
        </div>
        {block.type === "image" ? (
          <input
            type="text"
            placeholder={placeholders[block.type]}
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className="w-full p-1 border border-gray-300 rounded"
          />
        ) : (
          <textarea
            placeholder={placeholders[block.type]}
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            rows={block.type === "list" ? 4 : 2}
            className="w-full p-1 border border-gray-300 rounded"
          />
        )}
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-10 w-full max-w-[800px] mx-auto relative">
      <Link to="/admin/panel" className="absolute top-4 left-2  text-blue-500">
        <ArrowNarrowLeft size={30} />
      </Link>
      <h2 className="text-3xl font-bold mb-6 text-center">Crear Noticia</h2>

      {isPreview ? (
        <div className="w-full bg-white p-4 rounded shadow">
          <h1 className="text-5xl font-extrabold tracking-wider uppercase text-gray-800 text-center p-2">
            {form?.title || ""}
          </h1>
          <p className="italic text-base text-[#4b5563] mb-20 mt-5 text-center">
            {form?.description || ""}
          </p>
          <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Volver a Editar
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-[400px]"
        >
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categorys.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="image"
            placeholder="URL de imagen destacada"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Cuerpo de la Noticia</h3>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {["title", "subtitle", "paragraph", "image", "list", "quote"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    className="bg-gray-200 hover:bg-gray-300 text-sm rounded px-2 py-1"
                  >
                    Añadir {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                )
              )}
            </div>
            {blocks.map(renderBlock)}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Vista Previa
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
            >
              Publicar Noticia
            </button>
          </div>
        </form>
      )}
    </main>
  )
}
