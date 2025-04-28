import Header from "./components/header"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="py-20 px-2 text-gray-800 max-w-[800px] w-full ">
        <Outlet />
      </main>
    </>
  )
}
