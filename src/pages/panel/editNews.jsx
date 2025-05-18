import { Link, useParams, useNavigate } from "react-router"
import { updateNews } from "../../services/newsService"
import { useContext, useState, useEffect } from "react"
import { NewsContext } from "../../context/context"
import { toast } from "sonner"
import {
  ArrowNarrowLeft,
  ArrowUpIcon,
  DeleteIcon,
} from "../../components/ui/icons"
import { changeTitle } from "../../utils/changeTitle"

export default function EditNews({ news }) {
  const { categorys } = useContext(NewsContext)
  const { setNews } = useContext(NewsContext)
  const { id } = useParams()
  const navigate = useNavigate()
  changeTitle("Editar Noticia")

  const newsData = news?.find((item) => item.id === id) || null
  const [form, setForm] = useState({
    title: newsData?.title || "",
    description: newsData?.description || "",
    category: newsData?.category || "",
    image: newsData?.image || "",
  })
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const extractContentBlocks = (htmlContent) => {
    if (!htmlContent || typeof htmlContent !== "string") {
      console.error("El contenido HTML está vacío o no es válido.")
      return []
    }

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, "text/html")

      // Buscar el contenido real dentro de la estructura HTML
      let contentContainer = doc.body

      // Si hay un div contenedor principal, lo usamos
      if (
        doc.body.children.length === 1 &&
        doc.body.children[0].tagName === "DIV"
      ) {
        contentContainer = doc.body.children[0]
      }

      if (!contentContainer || !contentContainer.children.length) {
        console.error("No se encontraron elementos en el contenido HTML.")
        return []
      }

      const blockPatterns = [
        { type: "title", tag: "h2" },
        { type: "subtitle", tag: "h3" },
        { type: "paragraph", tag: "p" },
        { type: "image", tag: "img", attr: "src" },
        { type: "list", tag: "ul" },
        { type: "quote", tag: "blockquote" },
        { type: "heading", tag: "h1" }, // Agregado para manejar h1
      ]

      const blocks = Array.from(contentContainer.children)
        .map((el) => {
          const tagName = el.tagName.toLowerCase()
          const pattern = blockPatterns.find((p) => p.tag === tagName)

          if (!pattern) {
            console.warn(`Elemento no reconocido: ${tagName}`)
            return null
          }

          return {
            id: crypto.randomUUID(),
            type: pattern.type,
            content: pattern.attr
              ? el.getAttribute(pattern.attr) || ""
              : el.innerHTML.trim(),
          }
        })
        .filter(Boolean)

      return blocks
    } catch (error) {
      console.error("Error al parsear HTML:", error)
      return []
    }
  }

  useEffect(() => {
    if (newsData) {
      const extractedBlocks = extractContentBlocks(newsData.content)
      setBlocks(extractedBlocks)
      setIsLoading(false)
    }
  }, [newsData])

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
      title: 'style="color: rgb(194, 65, 12); margin-top: 2em;"',
      subtitle:
        'style="font-size: 1.5rem; margin-top: 1.5em; color: rgb(71, 85, 105);"',
      paragraph: 'style="line-height: 1.7;"',
      image: 'style="max-width: 100%; border-radius: 12px; margin: 1em 0px;"',
      list: 'style="margin-left: 2em;"',
      quote:
        'style="background: rgb(241, 245, 249); border-left: 4px solid rgb(148, 163, 184); padding: 1em; margin: 2em 0px; color: rgb(71, 85, 105);"',
      heading:
        'style="font-size: 2.2rem; font-weight: bold; text-align: center;"',
    }

    return blocks
      .map((block) => {
        const style = blockStyles[block.type] || ""
        switch (block.type) {
          case "title":
          case "heading": // Maneja h1 como heading
            return `<h2 ${style}>${block.content}</h2>`
          case "subtitle":
            return `<h3 ${style}>${block.content}</h3>`
          case "paragraph":
            return `<p ${style}>${block.content}</p>`
          case "image":
            return `<img src="${block.content}" alt="" ${style} />`
          case "list":
            return `<ul ${style}>${block.content
              .split("\n")
              .map((li) => `<li>${li}</li>`)
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

    console.log(id)

    updateNews(id, { ...form, content: html })
      .then(() => {
        setNews((prevNews) =>
          prevNews.map((item) => (item.id === id ? newsData : item))
        )
        toast.success("Noticia actualizada exitosamente")
      })
      .catch(
        (error) => console.error("Error al actualizar la noticia:", error),
        toast.error("Error al actualizar la noticia")
      )
      .finally(() => navigate("/admin/panel"))
  }

  const renderBlock = (block) => {
    const placeholders = {
      title: "Título",
      subtitle: "Subtítulo",
      paragraph: "Párrafo",
      image: "URL de la imagen",
      list: "Lista (una línea por elemento)",
      quote: "Cita",
      heading: "Encabezado principal",
    }

    return (
      <div key={block.id} className="border p-2 rounded bg-gray-50 mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="capitalize font-medium">
            {placeholders[block.type] || block.type}
          </span>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => moveBlock(block.id, "up")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              <span className="text-blue-400">
                <ArrowUpIcon />
              </span>
            </button>
            <button
              type="button"
              onClick={() => moveBlock(block.id, "down")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              <span className="text-blue-400">
                <ArrowUpIcon />
              </span>
            </button>
            <button
              type="button"
              onClick={() => removeBlock(block.id)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
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
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : (
          <textarea
            placeholder={placeholders[block.type]}
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            rows={block.type === "list" ? 4 : 2}
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
      </div>
    )
  }

  if (isLoading) return <div className="text-center py-10">Cargando...</div>
  if (!newsData)
    return <div className="text-center py-10">Noticia no encontrada</div>

  return (
    <main className="flex flex-col items-center min-h-screen py-10 w-full max-w-xl mx-auto relative">
      <Link to="/admin/panel" className="absolute top-4 left-2 text-blue-500 ">
        <ArrowNarrowLeft size={30} />
      </Link>
      <h2 className="text-3xl font-bold mb-6 text-center">Editar Noticia</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
          {categorys?.map((cat) => (
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
          {blocks.length > 0 ? (
            blocks.map(renderBlock)
          ) : (
            <p className="text-gray-500">No hay bloques de contenido</p>
          )}
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
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded hover:bg-orange-700 mt-6"
          style={{ backgroundColor: "rgb(194, 65, 12)", color: "white" }}
        >
          Actualizar Noticia
        </button>
      </form>
    </main>
  )
}
