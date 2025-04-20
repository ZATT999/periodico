import { BrowserRouter, Link, Route, Routes } from "react-router"
import NewsPage from "./pages/news"
import NewsId from "./pages/id"
import { Providers } from "./providers"
import Login from "./pages/login"
import Panel from "./pages/panel"
import UseIsAdmin from "./hooks/useIsAdmin"

export default function App() {
  const isAdmin = UseIsAdmin()

  return (
    <>
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewsPage />} />
            <Route path="/noticia/:slug" element={<NewsId />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/Panel"
              element={
                isAdmin ? (
                  <Panel />
                ) : (
                  <section>
                    <h1>404</h1>
                    <p>pagina No encontrado</p>
                    <Link to="/">Volver a la página principal</Link>
                  </section>
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </Providers>
    </>
  )
}
