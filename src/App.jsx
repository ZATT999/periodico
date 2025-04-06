import { BrowserRouter, Route, Routes } from "react-router"
import NoticiasPage from "./pages/noticias"
import NoticiaId from "./pages/id"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoticiasPage />} />
          <Route path="/noticia/:slug" element={<NoticiaId />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
