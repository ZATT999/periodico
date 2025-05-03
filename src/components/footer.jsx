export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-600 w-full py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Marca y derechos */}
          <div>
            <h4 className="font-bold text-lg mb-2">CTE: Visión Empresarial</h4>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-base mb-2">Contacto</h4>
            <ul className="text-sm space-y-1">
              <li>📧 contacto@cte.edu.co</li>
              <li>📞 +57 300 123 4567</li>
              <li>📍 Calle 123 #45-67, Bogotá</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="font-semibold text-base mb-2">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-4 text-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:text-blue-600"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-blue-400"
              >
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-pink-500"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h4 className="font-semibold text-base mb-2">Referencias</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/sobre-nosotros" className="hover:underline">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/politica-privacidad" className="hover:underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos-condiciones" className="hover:underline">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
