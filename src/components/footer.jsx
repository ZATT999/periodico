export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-600 w-full py-10 mt-10 flex items-center justify-center flex-col gap-5">
      <div>
        <h4 className="font-bold text-lg mb-2 text-center">
          CTE: Visión Empresarial
        </h4>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
