import { AdvertisementsCard } from "./advertisementsCard"

export default function MapAdvertisements({ advertisements }) {
  console.log(advertisements)
  return (
    <>
      <section>
        <h1 className="text-2xl bg-[#f9fafb] border-y py-3 pl-5 font-semibold font-serif mb-10">
          Anuncios
        </h1>

        {advertisements.map((advertisement) => (
          <AdvertisementsCard
            key={advertisement.id}
            advertisements={advertisement}
          />
        ))}
      </section>
    </>
  )
}
