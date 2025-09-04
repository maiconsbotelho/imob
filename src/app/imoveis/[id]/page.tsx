import { Metadata } from 'next';
import PropertyDetailsClient from './PropertyDetailsClient';
import { createClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  
  try {
    const { data: property } = await supabase
      .from('properties')
      .select('title, description, price, city, state, images')
      .eq('id', id)
      .single();

    if (!property) {
      return {
        title: 'Imóvel não encontrado - Imobiliária Premium',
        description: 'O imóvel solicitado não foi encontrado.',
      };
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    const title = `${property.title} - ${formatPrice(property.price)} | Imobiliária Premium`;
    const description = property.description 
      ? `${property.description.substring(0, 150)}...`
      : `${property.title} em ${property.city}, ${property.state}. ${formatPrice(property.price)}. Entre em contato para mais informações.`;
    
    const imageUrl = property.images?.[0] || '/hero-banner.webp';

    return {
      title,
      description,
      keywords: `imóvel, ${property.city}, ${property.state}, venda, aluguel, ${formatPrice(property.price)}`,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'pt_BR',
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: 'Erro ao carregar imóvel - Imobiliária Premium',
      description: 'Ocorreu um erro ao carregar as informações do imóvel.',
    };
  }
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;
  return <PropertyDetailsClient propertyId={id} />;
}