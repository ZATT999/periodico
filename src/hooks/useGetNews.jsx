import { useEffect, useState } from "react"

export const useGetNews = (id) => {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.log(err))
  }, [id])

  return news
}
