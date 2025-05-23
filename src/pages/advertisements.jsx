import MapAdvertisements from "../components/mapAdvertisements"
import NavHeader from "../components/navHeader"

export default function Advertisements({ advertisements }) {
  return (
    <>
      <NavHeader />
      <MapAdvertisements advertisements={advertisements} />
    </>
  )
}
