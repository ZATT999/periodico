import { BrowserRouter, Link, Route, Routes } from "react-router"
import NewsPage from "./pages/news"
import NewsId from "./pages/id"
import Login from "./pages/login"
import Panel from "./pages/panel"
import NotFound from "./pages/notFound"
import Spinner from "./components/ui/loading"
import { Toaster } from "sonner"
import Layout from "./layout"
import { useContext } from "react"
import { NewsContext, UserContext } from "./context/context"

export default function App() {
  const { user, loading } = useContext(UserContext)
  const { loading: loadingNews } = useContext(NewsContext)

  if (loading || loadingNews) return <Spinner />

  return (
    <>
      <BrowserRouter>
        <Toaster
          richColors
          position="bottom-right"
          duration={2000}
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<NewsPage />} />
            <Route path="/noticia/:slug" element={<NewsId />} />
            {user?.isAdmin ? (
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
