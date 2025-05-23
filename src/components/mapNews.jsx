import NewsCard from "./newsCard"

export default function MapNews({ news, category }) {
  return (
    <>
      <h1 className="text-2xl bg-[#f9fafb] border-y py-3 pl-5 font-semibold font-serif mb-10">
        Noticias {category === undefined ? "" : ` - ${category}`}
      </h1>

      <section className="mansory px-2 md:px-5 ">
        {news.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </section>
    </>
  )
}
