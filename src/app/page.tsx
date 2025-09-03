
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { FiSearch, FiHome, FiTrendingUp } from "react-icons/fi";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Encontre o
                <span className="block text-yellow-400">Imóvel Perfeito</span>
                para Você
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Descubra as melhores opções de casas, apartamentos e terrenos 
                com atendimento personalizado e total transparência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Link href="/imoveis">
                    <FiSearch className="mr-2 h-5 w-5" />
                    Ver Todos os Imóveis
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/imoveis?featured=true">
                    <FiTrendingUp className="mr-2 h-5 w-5" />
                    Imóveis em Destaque
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero-banner.webp"
                alt="Casa moderna"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecionamos os melhores imóveis para você. Confira nossa curadoria especial 
            com as propriedades mais procuradas.
          </p>
        </div>
        
        <FeaturedCarousel />
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/imoveis">
              Ver Todos os Imóveis
            </Link>
          </Button>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher Nossa Imobiliária?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHome className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Variedade de Imóveis
              </h3>
              <p className="text-gray-600">
                Amplo portfólio com casas, apartamentos e terrenos em diversas regiões.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Melhores Preços
              </h3>
              <p className="text-gray-600">
                Preços competitivos e condições de pagamento flexíveis para você.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Atendimento Especializado
              </h3>
              <p className="text-gray-600">
                Equipe experiente para te ajudar a encontrar o imóvel ideal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
