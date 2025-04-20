const date = new Date().toLocaleDateString("es-ES", {
  year: "2-digit",
  month: "short",
  day: "numeric",
})

export const getDate = date.charAt(0).toUpperCase() + date.slice(1)
