'use client';

import { useState, useMemo } from 'react';
import { Property, PropertyFilters, PROPERTY_TYPES, PROPERTY_STATUS, TRANSACTION_TYPES } from '@/types/property';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';

export default function ImoveisPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    type: undefined,
    status: 'disponivel',
    transaction_type: undefined,
    min_price: undefined,
    max_price: undefined,
    min_bedrooms: undefined,
    max_bedrooms: undefined,
    min_bathrooms: undefined,
    max_bathrooms: undefined,
    min_area: undefined,
    max_area: undefined,
    city: undefined,
    state: undefined,
    features: undefined
  });

  const { properties, loading, error, refetch } = useProperties(filters);

  const handleFilterChange = (key: keyof PropertyFilters, value: string | number | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: undefined,
      status: 'disponivel',
      transaction_type: undefined,
      min_price: undefined,
      max_price: undefined,
      min_bedrooms: undefined,
      max_bedrooms: undefined,
      min_bathrooms: undefined,
      max_bathrooms: undefined,
      min_area: undefined,
      max_area: undefined,
      city: undefined,
      state: undefined,
      features: undefined
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Imóveis</h1>
          <p className="text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro: {error}</p>
          <Button onClick={refetch}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Imóveis</h1>
        <p className="text-gray-600">Encontre o imóvel perfeito para você</p>
      </div>

      {/* Filtros e Controles */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por título, descrição ou endereço..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Botão de Filtros */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <FiFilter className="h-4 w-4" />
              Filtros
            </Button>

            {/* Controles de Visualização */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <FiGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <FiList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filtros Expandidos */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <Select
                  value={filters.type || ''}
                  onValueChange={(value) => handleFilterChange('type', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transação</label>
                <Select
                  value={filters.transaction_type || ''}
                  onValueChange={(value) => handleFilterChange('transaction_type', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Venda ou Aluguel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Venda ou Aluguel</SelectItem>
                    {TRANSACTION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preço Mínimo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
                <Input
                  type="number"
                  placeholder="R$ 0"
                  value={filters.min_price || ''}
                  onChange={(e) => handleFilterChange('min_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>

              {/* Preço Máximo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
                <Input
                  type="number"
                  placeholder="R$ 999.999.999"
                  value={filters.max_price || ''}
                  onChange={(e) => handleFilterChange('max_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>

              {/* Quartos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quartos (mín.)</label>
                <Select
                  value={filters.min_bedrooms?.toString() || ''}
                  onValueChange={(value) => handleFilterChange('min_bedrooms', value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Qualquer</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Banheiros */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banheiros (mín.)</label>
                <Select
                  value={filters.min_bathrooms?.toString() || ''}
                  onValueChange={(value) => handleFilterChange('min_bathrooms', value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Qualquer</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <Input
                  placeholder="Ex: São Paulo"
                  value={filters.city || ''}
                  onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
                />
              </div>

              {/* Botão Limpar Filtros */}
              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
        </p>
      </div>

      {/* Grid de Imóveis */}
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Nenhum imóvel encontrado com os filtros aplicados.</p>
          <Button onClick={clearFilters} variant="outline">
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {properties.map((property: Property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              className={viewMode === 'list' ? 'md:flex md:max-w-none' : ''}
            />
          ))}
        </div>
      )}
    </div>
  );
}