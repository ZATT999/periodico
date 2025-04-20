import { useState, useEffect } from "react"
import { NewsContext } from "./context"

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/news?limit=10?page=1")
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.log(err))
  }, [])

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  )
}

export default NewsContext
