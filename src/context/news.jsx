import { useState, useEffect } from "react"
import { NewsContext } from "./context"
import { urlForFetchs } from "../utils/urlForFetchs"

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])
  console.log(news)

  useEffect(() => {
    fetch(`${urlForFetchs()}/api/news`)
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
