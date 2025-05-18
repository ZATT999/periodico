import { useContext, useState } from "react"
import { NewsContext } from "../../context/context"
import { Link } from "react-router"
import { ArrowNarrowLeft } from "../../components/ui/icons"
import { createNews } from "../../services/newsService"

export default function CreateNews() {
  const { categorys } = useContext(NewsContext)

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  })

  const [blocks, setBlocks] = useState([])

  const addBlock = (type) => {
    setBlocks([
      ...blocks,
      { id: crypto.randomUUID(), type, content: type === "image" ? "" : "" },
    ])
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
    return blocks
      .map((block) => {
        switch (block.type) {
          case "title":
            return `<h2 style="color: rgb(194, 65, 12); margin-top: 2em;">${block.content}</h2>`
          case "subtitle":
            return `<h3 style="font-size: 1.5rem; margin-top: 1.5em; color: rgb(71, 85, 105);">${block.content}</h3>`
          case "paragraph":
            return `<p style="line-height: 1.7;">${block.content}</p>`
          case "image":
            return `<img src="${block.content}" alt="" style="max-width: 100%; border-radius: 12px; margin: 1em 0px;" />`
          case "list":
            return `<ul style="margin-left: 2em;">${block.content
              .split("\n")
              .map((li) => `<li style="margin-bottom: 0.5em;">${li}</li>`)
              .join("")}</ul>`
          case "quote":
            return `<blockquote style="background: rgb(241, 245, 249); border-left: 4px solid rgb(148, 163, 184); padding: 1em; margin: 2em 0px; color: rgb(71, 85, 105);">${block.content}</blockquote>`
          default:
            return ""
        }
      })
      .join("")
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const html = `<div style="font-family: Georgia, serif; color: rgb(30, 27, 24); line-height: 1.7;">
      <h1 style="font-size: 2.2rem; font-weight: bold; text-align: center; margin-bottom: 0.5em; letter-spacing: 1px;">
        ${form.title}
      </h1>
      <p style="text-align: center; font-style: italic; color: rgb(85, 85, 85); margin-bottom: 2em;">
        ${form.description}
      </p>
      ${generateHTML()}
    </div>`

    const newsData = {
      ...form,
      content: html,
      date: new Date().toISOString(),
      author: {
        name: "Admin", // o el nombre del autor actual
      },
      id: crypto.randomUUID(),
    }

    // Aquí haces la llamada a tu API con `newsData`
    createNews(newsData)
  }

  // Styles for preview
  const previewStyles = {
    fontFamily: "Georgia, serif",
    color: "rgb(30, 27, 24)",
    lineHeight: "1.7",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#fff",
    marginTop: "20px",
  }

  return (
    <main
      className="flex flex-col items-center min-h-screen py-10 w-full max-w-xl mx-auto"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <Link to="/admin/panel" className="absolute top-4 left-2 text-blue-500">
        <ArrowNarrowLeft />
      </Link>

      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ fontSize: "2.2rem", letterSpacing: "1px" }}
      >
        Crear Noticia
      </h2>

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
          <h3
            className="text-xl font-semibold"
            style={{ color: "rgb(71, 85, 105)" }}
          >
            Cuerpo de la Noticia
          </h3>
          {blocks.map((block, idx) => (
            <div key={block.id} className="border p-2 rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="capitalize font-medium">
                  {block.type === "title"
                    ? "Título"
                    : block.type === "subtitle"
                    ? "Subtítulo"
                    : block.type === "paragraph"
                    ? "Párrafo"
                    : block.type === "image"
                    ? "Imagen"
                    : block.type === "list"
                    ? "Lista"
                    : block.type === "quote"
                    ? "Cita"
                    : block.type}
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => moveBlock(block.id, "up")}
                  >
                    ⬆️
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(block.id, "down")}
                  >
                    ⬇️
                  </button>
                  <button type="button" onClick={() => removeBlock(block.id)}>
                    ❌
                  </button>
                </div>
              </div>
              {block.type === "image" ? (
                <input
                  type="text"
                  placeholder="URL de la imagen"
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              ) : (
                <textarea
                  placeholder={`Contenido de ${
                    block.type === "title"
                      ? "título"
                      : block.type === "subtitle"
                      ? "subtítulo"
                      : block.type === "paragraph"
                      ? "párrafo"
                      : block.type === "list"
                      ? "lista (una línea por elemento)"
                      : block.type === "quote"
                      ? "cita"
                      : block.type
                  }`}
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  rows={block.type === "list" ? 4 : 2}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              )}
            </div>
          ))}

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { type: "title", name: "Título" },
              { type: "subtitle", name: "Subtítulo" },
              { type: "paragraph", name: "Párrafo" },
              { type: "image", name: "Imagen" },
              { type: "list", name: "Lista" },
              { type: "quote", name: "Cita" },
            ].map(({ type, name }) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="bg-gray-200 hover:bg-gray-300 text-sm rounded px-2 py-1"
                style={{
                  backgroundColor:
                    type === "title"
                      ? "rgba(194, 65, 12, 0.1)"
                      : type === "quote"
                      ? "rgba(241, 245, 249, 0.8)"
                      : "rgb(241, 245, 249)",
                }}
              >
                Añadir {name}
              </button>
            ))}
          </div>
        </div>

        {blocks.length > 0 && (
          <div className="mt-6">
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "rgb(71, 85, 105)" }}
            >
              Vista previa de la noticia
            </h3>
            <div style={previewStyles}>
              <h1
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "0.5em",
                  letterSpacing: "1px",
                }}
              >
                {form.title || "Título de la noticia"}
              </h1>
              <p
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "rgb(85, 85, 85)",
                  marginBottom: "2em",
                }}
              >
                {form.description || "Descripción de la noticia"}
              </p>
              {blocks.map((block) => {
                switch (block.type) {
                  case "title":
                    return (
                      <h2
                        key={block.id}
                        style={{ color: "rgb(194, 65, 12)", marginTop: "2em" }}
                      >
                        {block.content}
                      </h2>
                    )
                  case "subtitle":
                    return (
                      <h3
                        key={block.id}
                        style={{
                          fontSize: "1.5rem",
                          marginTop: "1.5em",
                          color: "rgb(71, 85, 105)",
                        }}
                      >
                        {block.content}
                      </h3>
                    )
                  case "paragraph":
                    return (
                      <p key={block.id} style={{ lineHeight: "1.7" }}>
                        {block.content}
                      </p>
                    )
                  case "image":
                    return block.content ? (
                      <img
                        key={block.id}
                        src={block.content}
                        alt=""
                        style={{
                          maxWidth: "100%",
                          borderRadius: "12px",
                          margin: "1em 0",
                        }}
                      />
                    ) : (
                      <div
                        key={block.id}
                        style={{
                          height: "200px",
                          background: "#eee",
                          borderRadius: "12px",
                          margin: "1em 0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Vista previa de la imagen
                      </div>
                    )
                  case "list":
                    return (
                      <ul key={block.id} style={{ marginLeft: "2em" }}>
                        {block.content.split("\n").map((item, i) => (
                          <li key={i} style={{ marginBottom: "0.5em" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  case "quote":
                    return (
                      <blockquote
                        key={block.id}
                        style={{
                          background: "rgb(241, 245, 249)",
                          borderLeft: "4px solid rgb(148, 163, 184)",
                          padding: "1em",
                          margin: "2em 0",
                          color: "rgb(71, 85, 105)",
                        }}
                      >
                        {block.content}
                      </blockquote>
                    )
                  default:
                    return null
                }
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 rounded hover:bg-blue-700 mt-6"
          style={{ backgroundColor: "rgb(194, 65, 12)", color: "white" }}
        >
          Publicar Noticia
        </button>
      </form>
    </main>
  )
}
