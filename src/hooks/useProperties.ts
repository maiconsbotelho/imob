'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Property, PropertyFilters } from '@/types/property';

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProperties(filters?: PropertyFilters): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createClient();
      let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplicar filtros se fornecidos
      if (filters) {
        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,address.ilike.%${filters.search}%`);
        }
        if (filters.type) {
          query = query.eq('type', filters.type);
        }
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        if (filters.transaction_type) {
          query = query.eq('transaction_type', filters.transaction_type);
        }
        if (filters.city) {
          query = query.ilike('city', `%${filters.city}%`);
        }
        if (filters.state) {
          query = query.eq('state', filters.state);
        }
        if (filters.min_price) {
          query = query.gte('price', filters.min_price);
        }
        if (filters.max_price) {
          query = query.lte('price', filters.max_price);
        }
        if (filters.min_bedrooms) {
          query = query.gte('bedrooms', filters.min_bedrooms);
        }
        if (filters.max_bedrooms) {
          query = query.lte('bedrooms', filters.max_bedrooms);
        }
        if (filters.min_bathrooms) {
          query = query.gte('bathrooms', filters.min_bathrooms);
        }
        if (filters.max_bathrooms) {
          query = query.lte('bathrooms', filters.max_bathrooms);
        }
        if (filters.min_area) {
          query = query.gte('area', filters.min_area);
        }
        if (filters.max_area) {
          query = query.lte('area', filters.max_area);
        }
        if (filters.features && filters.features.length > 0) {
          query = query.overlaps('features', filters.features);
        }
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setProperties(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar imóveis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [JSON.stringify(filters)]); // Reexecutar quando os filtros mudarem

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties
  };
}

// Hook específico para imóveis em destaque
export function useFeaturedProperties(): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createClient();
      const { data, error: supabaseError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'disponivel')
        .order('created_at', { ascending: false })
        .limit(6); // Limitar a 6 imóveis em destaque

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setProperties(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar imóveis em destaque');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: fetchFeaturedProperties
  };
}

// Hook para buscar um imóvel específico por ID
export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createClient();
      const { data, error: supabaseError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setProperty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar imóvel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  return {
    property,
    loading,
    error,
    refetch: fetchProperty
  };
}