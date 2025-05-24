import { BrowserRouter, Link, Route, Routes } from "react-router"
import { NewsContext, UserContext } from "./context/context"
import CategorysId from "./pages/noticias/[category]"
import CreateNews from "./pages/panel/createNews"
import EditNews from "./pages/panel/editNews"
import Spinner from "./components/spinner"
import NewPage from "./pages/noticias/[id]"
import NotFound from "./pages/notFound"
import Panel from "./pages/panel/panel"
import { useContext } from "react"
import Login from "./pages/login"
import { Toaster } from "sonner"
import News from "./pages/news"
import Layout from "./layout"
import MapAdvertisements from "./components/mapAdvertisements"
import Advertisements from "./pages/advertisements"

export default function App() {
  const { user, loading } = useContext(UserContext)
  const { loading: loadingNews, news } = useContext(NewsContext)

  if (loading || loadingNews) return <Spinner />

  const advertisements = news.filter(
    (newsItem) => newsItem.category === "Anuncios"
  )

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
            <Route path="/" element={<News />} />
            <Route path="/noticia/:id" element={<NewPage />} />s
            <Route
              path="/noticias/:category"
              element={<CategorysId allNews={news} />}
            />
            <Route
              path="/anuncios"
              element={<Advertisements advertisements={advertisements} />}
            />
            {user?.isAdmin ? (
              <>
                <Route path="/admin/panel" element={<Panel />} />
                <Route path="/admin/panel/create" element={<CreateNews />} />
                <Route
                  path="/admin/panel/news/:id"
                  element={<EditNews news={news} />}
                />
              </>
            ) : (
              <Route
                path="/admin/panel"
                element={
                  <main>
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
