import { useState, useEffect } from "react"
import { NewsContext } from "./context"
import { urlForFetchs } from "../utils/urlForFetchs"

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${urlForFetchs()}/api/news`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()

        if (response.ok) {
          setNews(data.news)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
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

export default NewsContext
