import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imóveis - Imobiliária Premium',
  description: 'Encontre o imóvel perfeito para você. Casas, apartamentos, terrenos e imóveis comerciais com os melhores preços e localização.',
  keywords: 'imóveis, casas, apartamentos, terrenos, venda, aluguel, imobiliária',
  openGraph: {
    title: 'Imóveis - Imobiliária Premium',
    description: 'Encontre o imóvel perfeito para você. Casas, apartamentos, terrenos e imóveis comerciais.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imóveis - Imobiliária Premium',
    description: 'Encontre o imóvel perfeito para você. Casas, apartamentos, terrenos e imóveis comerciais.',
  },
};

export default function ImoveisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}