-- Criar tabela properties
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL CHECK (price > 0),
  type TEXT NOT NULL CHECK (type IN ('casa', 'apartamento', 'terreno', 'comercial', 'rural')),
  status TEXT DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'vendido', 'alugado', 'reservado')),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('venda', 'aluguel', 'ambos')),
  bedrooms INTEGER CHECK (bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms >= 0),
  area DECIMAL(8,2) CHECK (area > 0),
  built_area DECIMAL(8,2) CHECK (built_area >= 0 OR built_area IS NULL),
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de propriedades disponíveis
CREATE POLICY "Public can view available properties" ON properties
    FOR SELECT USING (status = 'disponivel');

-- Inserir dados de exemplo
INSERT INTO properties (
    title,
    description,
    price,
    type,
    status,
    transaction_type,
    bedrooms,
    bathrooms,
    area,
    built_area,
    address,
    neighborhood,
    city,
    state,
    zip_code,
    images,
    features
) VALUES 
(
    'Casa Moderna no Centro',
    'Belíssima casa moderna com acabamento de primeira qualidade. Localizada em área nobre da cidade.',
    850000.00,
    'casa',
    'disponivel',
    'venda',
    4,
    3,
    300.00,
    250.00,
    'Rua das Flores, 123',
    'Centro',
    'São Paulo',
    'SP',
    '01234-567',
    ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
    ARRAY['piscina', 'churrasqueira', 'garagem_2_vagas']
),
(
    'Apartamento Cobertura Duplex',
    'Apartamento de cobertura com vista panorâmica da cidade. Acabamento de luxo.',
    1200000.00,
    'apartamento',
    'disponivel',
    'venda',
    3,
    2,
    180.00,
    180.00,
    'Avenida Paulista, 1000',
    'Bela Vista',
    'São Paulo',
    'SP',
    '01310-100',
    ARRAY['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
    ARRAY['vista_panoramica', 'cobertura', 'elevador']
),
(
    'Apartamento Compacto para Locação',
    'Apartamento compacto e bem localizado, ideal para jovens profissionais.',
    2500.00,
    'apartamento',
    'disponivel',
    'aluguel',
    1,
    1,
    45.00,
    45.00,
    'Rua Augusta, 500',
    'Consolação',
    'São Paulo',
    'SP',
    '01305-000',
    ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    ARRAY['mobiliado', 'proximo_metro']
);