import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router"
import NewsPage from "./pages/news"
import NewsId from "./pages/id"
import { Providers } from "./providers"
import Login from "./pages/login"
import Panel from "./pages/panel"
import UseIsAdmin from "./hooks/useIsAdmin"
import Spinner from "./components/loading"

export default function App() {
  const { isAdmin, loading } = UseIsAdmin()

  if (loading) return <Spinner />

  // text-[#f97316] bg-[#fde68a] text-[#92400e]

  return (
    <>
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewsPage />} />
            <Route path="/noticia/:slug" element={<NewsId />} />
            <Route path="/login" element={<Login />} />
            {isAdmin ? (
              <Route path="/admin/panel" element={<Panel />} />
            ) : (
              <Route
                path="/admin/panel"
                element={
                  <main>
                    <h1 className="text-3xl text-center">por cachon</h1>
                    <h3>No tienes permisos para acceder a esta pagina</h3>
                    <Link to="/">Ir al inicio</Link>
                  </main>
                }
              />
            )}

            <Route
              path="*"
              element={
                <main>
                  <h1>404</h1>
                  <p>No existe esa pagina</p>
                  <Link to="/">Ir al inicio</Link>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </Providers>
    </>
  )
}
