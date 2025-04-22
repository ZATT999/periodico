export const urlForFetchs = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000`
  }
  return `https://periodico-backend.onrender.com`
}
