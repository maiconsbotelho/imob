import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

interface PropertySitemap {
  id: string;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = 'https://imobiliaria.com';

  // URLs estáticas
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/imoveis`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // URLs dinâmicas dos imóveis
  try {
    const { data: properties } = await supabase
      .from('properties')
      .select('id, updated_at')
      .eq('is_active', true);

    const propertyUrls = (properties as PropertySitemap[])?.map((property: PropertySitemap) => ({
      url: `${baseUrl}/imoveis/${property.id}`,
      lastModified: new Date(property.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || [];

    return [...staticUrls, ...propertyUrls];
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    return staticUrls;
  }
}