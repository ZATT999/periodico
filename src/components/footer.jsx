export default function Footer() {
  return (
    <footer className="bg-blue-50 text-center py-6 text-gray-600 w-full">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CTE: Visión Empresarial
          <br />
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
