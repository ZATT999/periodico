import Header from "./components/header"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="py-20 text-gray-800">
        <Outlet />
      </main>
    </>
  )
}
