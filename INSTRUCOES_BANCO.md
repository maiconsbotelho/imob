# 🚨 INSTRUÇÕES URGENTES - Configuração do Banco de Dados

## Problema Identificado
A tabela `properties` não existe no banco de dados Supabase, causando erro 500 nas requisições.

## ✅ Solução - Execute os seguintes passos:

### 1. Acesse o Supabase Dashboard
1. Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto: `bedcxozmxfadnrpjetcu`

### 2. Abra o SQL Editor
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**

### 3. Execute o Script SQL
Copie e cole o seguinte código SQL e execute:

```sql
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

-- Habilitar RLS (Row Level Security)
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
),
(
    'Terreno Comercial Estratégico',
    'Excelente terreno para investimento comercial. Localizado em avenida de grande movimento.',
    2000000.00,
    'terreno',
    'disponivel',
    'venda',
    0,
    0,
    1000.00,
    NULL,
    'Avenida Marginal, 2000',
    'Vila Olímpia',
    'São Paulo',
    'SP',
    '04551-000',
    ARRAY['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'],
    ARRAY['comercial', 'esquina', 'alto_movimento']
),
(
    'Sobrado Familiar no Morumbi',
    'Sobrado espaçoso em condomínio fechado. Ideal para famílias que buscam segurança e conforto.',
    1500000.00,
    'casa',
    'disponivel',
    'venda',
    5,
    4,
    400.00,
    350.00,
    'Rua do Morumbi, 800',
    'Morumbi',
    'São Paulo',
    'SP',
    '05650-000',
    ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'],
    ARRAY['condominio_fechado', 'seguranca_24h', 'area_lazer']
),
(
    'Casa Comercial para Escritório',
    'Casa comercial ideal para escritórios, clínicas ou consultórios. Bem localizada.',
    8000.00,
    'comercial',
    'disponivel',
    'aluguel',
    0,
    3,
    200.00,
    180.00,
    'Rua Comercial, 150',
    'Jardins',
    'São Paulo',
    'SP',
    '01401-000',
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    ARRAY['uso_comercial', 'estacionamento', 'facil_acesso']
);
```

### 4. Verificar se funcionou
Após executar o script, execute esta consulta para verificar:

```sql
SELECT COUNT(*) as total_properties FROM properties;
```

Deve retornar: `total_properties: 6`

### 5. Testar a aplicação
Após executar o SQL:
1. Recarregue a página da aplicação
2. Os imóveis devem aparecer normalmente
3. Não deve mais haver erros 500

## 🔧 Arquivos de Referência
- `supabase-setup.sql` - Script completo de configuração
- `test-data.sql` - Dados de teste adicionais
- `create_table.sql` - Script simplificado criado agora

## ❗ Importante
Este problema ocorreu porque a tabela `properties` não foi criada no banco de dados. O script SQL resolve isso criando a tabela com a estrutura correta e inserindo dados de exemplo.