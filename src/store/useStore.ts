import { create } from 'zustand';
import { Property } from '@/types/database';

interface FilterState {
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
}

interface AppState {
  // Filtros de busca
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Menu mobile
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  
  // Imóveis em destaque (cache)
  featuredProperties: Property[];
  setFeaturedProperties: (properties: Property[]) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialFilters: FilterState = {
  city: '',
  propertyType: '',
  minPrice: 0,
  maxPrice: 0,
  bedrooms: 0,
  bathrooms: 0,
};

export const useStore = create<AppState>((set) => ({
  // Filtros
  filters: initialFilters,
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  resetFilters: () => set({ filters: initialFilters }),
  
  // Menu mobile
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  // Imóveis em destaque
  featuredProperties: [],
  setFeaturedProperties: (properties) => set({ featuredProperties: properties }),
  
  // Loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));