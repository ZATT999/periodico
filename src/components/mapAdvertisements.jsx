import { AdvertisementsCard } from "./advertisementsCard"

export default function MapAdvertisements({ advertisements }) {
  return (
    <>
      <section>
        <div className="flex justify-center items-center gap-2 text-gray-600 mb-10">
          <p className="text-sm">
            Ponte en contacto con nosotros para publicar tu anuncio
          </p>
        </div>

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
