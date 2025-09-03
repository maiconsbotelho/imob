import Link from "next/link";
import { FiHome, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FiHome className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Imobiliária</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Encontre o imóvel dos seus sonhos. Oferecemos as melhores opções de casas, 
              apartamentos e terrenos da região com atendimento personalizado.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/imoveis" className="text-gray-300 hover:text-white transition-colors">
                  Todos os Imóveis
                </Link>
              </li>
              <li>
                <Link href="/imoveis?featured=true" className="text-gray-300 hover:text-white transition-colors">
                  Imóveis em Destaque
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FiPhone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contato@imobiliaria.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <FiMapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Rua das Flores, 123<br />
                  Centro - São Paulo/SP
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Imobiliária. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}