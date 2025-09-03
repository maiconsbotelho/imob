// Tipos baseados na estrutura da tabela properties do Supabase

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  transaction_type: TransactionType;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number;
  built_area: number | null;
  address: string;
  neighborhood: string | null;
  city: string;
  state: string;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  features: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type PropertyType = 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural';

export type PropertyStatus = 'disponivel' | 'vendido' | 'alugado' | 'reservado';

export type TransactionType = 'venda' | 'aluguel' | 'ambos';

// Tipo para criação de nova propriedade (campos opcionais)
export interface CreatePropertyData {
  title: string;
  description?: string;
  price: number;
  type: PropertyType;
  status?: PropertyStatus;
  transaction_type: TransactionType;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  built_area?: number;
  address: string;
  neighborhood?: string;
  city: string;
  state: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  features?: string[];
}

// Tipo para filtros de busca
export interface PropertyFilters {
  search?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  transaction_type?: TransactionType;
  city?: string;
  state?: string;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  min_bathrooms?: number;
  max_bathrooms?: number;
  min_area?: number;
  max_area?: number;
  features?: string[];
}

// Constantes para os tipos de propriedade
export const PROPERTY_TYPES = [
  { value: 'casa' as PropertyType, label: 'Casa' },
  { value: 'apartamento' as PropertyType, label: 'Apartamento' },
  { value: 'terreno' as PropertyType, label: 'Terreno' },
  { value: 'comercial' as PropertyType, label: 'Comercial' },
  { value: 'rural' as PropertyType, label: 'Rural' }
];

// Constantes para os status
export const PROPERTY_STATUS = [
  { value: 'disponivel' as PropertyStatus, label: 'Disponível' },
  { value: 'vendido' as PropertyStatus, label: 'Vendido' },
  { value: 'alugado' as PropertyStatus, label: 'Alugado' },
  { value: 'reservado' as PropertyStatus, label: 'Reservado' }
];

// Constantes para tipos de transação
export const TRANSACTION_TYPES = [
  { value: 'venda' as TransactionType, label: 'Venda' },
  { value: 'aluguel' as TransactionType, label: 'Aluguel' },
  { value: 'ambos' as TransactionType, label: 'Venda/Aluguel' }
];