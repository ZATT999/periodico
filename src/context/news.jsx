import { useState, useEffect } from "react"
import { NewsContext } from "./context"

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/news")
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
