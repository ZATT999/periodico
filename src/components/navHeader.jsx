import { getDate } from "../utils/getDate"
import SideBarMenu from "./sideBarMenu"
import Categorys from "./categorys"
import { DateIcon } from "./icons"

export default function NavHeader() {
  return (
    <>
      <section className="flex items-center justify-between gap-2 mb-4 text-gray-600 px-4">
        <SideBarMenu />
        <span className="font-bold flex items-center gap-2">
          <DateIcon /> {getDate}
        </span>
      </section>

      <header className="py-6 mb-2 text-center">
        <h1 className="text-3xl @[250px]:text-4xl ml:text-5xl md:text-6xl font-extrabold tracking-wider uppercase text-gray-800">
          CTE: Visión empresarial
        </h1>
        <p className="text-sm mt-2 italic">
          Información, desde mejor perspectiva
        </p>
      </header>

      <Categorys />
    </>
  )
}
