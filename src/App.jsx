import { BrowserRouter, Link, Route, Routes } from "react-router"
import NoticiasPage from "./pages/noticias"
import NoticiaId from "./pages/id"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoticiasPage />} />
          <Route path="/noticia/:slug" element={<NoticiaId />} />
          <Route
            path="*"
            element={
              <div>
                <h1 className="titlePage">CTE: visiones empresariales</h1>

                <div>Pagina no encontrada</div>
                <Link to="/">Volver a la página principal</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}
