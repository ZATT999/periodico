const dateDay = new Date().toLocaleDateString("es-ES", {
  year: "2-digit",
  month: "short",
  day: "numeric",
})

const dateHour = new Date().toLocaleDateString("es-ES", {
  year: "2-digit",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
})

export const getDateHour = dateHour.charAt(0).toUpperCase() + dateHour.slice(1)
export const getDate = dateDay.charAt(0).toUpperCase() + dateDay.slice(1)
