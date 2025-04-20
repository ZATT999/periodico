import MapNews from "../components/mapNews"
import Header from "../components/header"

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start w-full h-screen py-10 gap-10">
        <h1 className="text-7xl font-bold font-[roboto] text-center my-30">
          Noticias
        </h1>
        <MapNews />
      </main>
    </>
  )
}
