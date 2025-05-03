import { useState, useEffect } from "react"
import { NewsContext } from "./context"
import { getAllNews } from "../services/newsService"

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews()
        const data = await res.json()

        if (!res.ok) throw new Error("Error al cargar las noticias")

        setNews(data.news)
        setLoading(false)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <NewsContext.Provider value={{ news, setNews, loading }}>
      {children}
    </NewsContext.Provider>
  )
}
