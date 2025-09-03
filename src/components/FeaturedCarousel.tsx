"use client";

import { useEffect, useState } from "react";
import { Property } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import PropertyCard from "./PropertyCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useStore } from "@/store/useStore";

export default function FeaturedCarousel() {
  const { featuredProperties, setFeaturedProperties, isLoading, setLoading } = useStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProperties() {
      if (featuredProperties.length > 0) return; // Já carregado
      
      setLoading(true);
      setError(null);
      
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            property_type:property_types(id, name)
          `)
          .eq('is_featured', true)
          .limit(6);

        if (error) {
          console.error('Erro ao buscar imóveis em destaque:', error);
          setError('Erro ao carregar imóveis em destaque');
          return;
        }

        setFeaturedProperties(data || []);
      } catch (err) {
        console.error('Erro inesperado:', err);
        setError('Erro inesperado ao carregar imóveis');
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProperties();
  }, [featuredProperties.length, setFeaturedProperties, setLoading]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-blue-600 hover:underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (featuredProperties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum imóvel em destaque encontrado.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredProperties.map((property) => (
            <CarouselItem key={property.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}