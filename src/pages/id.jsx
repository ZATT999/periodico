import { useParams } from "react-router"
import News from "../components/News"

export default function NewsId() {
  const params = useParams()

  return (
    <>
      <News id={params.slug} />
    </>
  )
}
