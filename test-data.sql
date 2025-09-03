-- =============================================
-- DADOS DE TESTE PARA O SISTEMA DE IMÓVEIS
-- =============================================

-- IMPORTANTE: Execute este script APÓS:
-- 1. Executar o supabase-setup.sql
-- 2. Criar e configurar o primeiro usuário admin
-- 3. Substituir 'SEU_ADMIN_ID_AQUI' pelo ID real do admin

-- Inserir imóveis de teste
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
    features,
    created_by
) VALUES 
(
    'Casa Moderna no Centro',
    'Belíssima casa moderna com acabamento de primeira qualidade. Localizada em área nobre da cidade, próxima a escolas, hospitais e shopping centers. Casa totalmente reformada com materiais de alta qualidade.',
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
    ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    ARRAY['piscina', 'churrasqueira', 'garagem_2_vagas', 'jardim', 'area_gourmet'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Apartamento Cobertura Duplex',
    'Magnífica cobertura duplex com vista panorâmica da cidade. Apartamento de alto padrão com 3 suítes, sala ampla, cozinha gourmet e terraço com piscina privativa.',
    1200000.00,
    'apartamento',
    'disponivel',
    'venda',
    3,
    4,
    180.00,
    180.00,
    'Avenida Paulista, 1000',
    'Bela Vista',
    'São Paulo',
    'SP',
    '01310-100',
    ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    ARRAY['piscina_privativa', 'vista_panoramica', 'garagem_3_vagas', 'elevador_privativo', 'portaria_24h'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Casa de Campo com Piscina',
    'Linda casa de campo ideal para quem busca tranquilidade e contato com a natureza. Propriedade com amplo terreno, piscina, área gourmet e vista para as montanhas.',
    650000.00,
    'casa',
    'disponivel',
    'venda',
    3,
    2,
    500.00,
    200.00,
    'Estrada do Campo, Km 15',
    'Zona Rural',
    'Campos do Jordão',
    'SP',
    '12460-000',
    ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800'],
    ARRAY['piscina', 'churrasqueira', 'lareira', 'vista_montanha', 'terreno_amplo'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Apartamento Compacto para Locação',
    'Apartamento compacto e bem localizado, ideal para jovens profissionais. Próximo ao metrô e universidades. Mobiliado e pronto para morar.',
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
    ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'],
    ARRAY['mobiliado', 'proximo_metro', 'portaria_24h', 'academia'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Terreno Comercial Estratégico',
    'Excelente terreno para investimento comercial. Localizado em avenida de grande movimento, ideal para construção de prédio comercial ou shopping center.',
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
    ARRAY['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    ARRAY['comercial', 'esquina', 'alto_movimento', 'zoneamento_comercial'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Sobrado Familiar no Morumbi',
    'Sobrado espaçoso em condomínio fechado no Morumbi. Ideal para famílias grandes, com 5 quartos, sala de estar, sala de jantar, cozinha ampla e quintal.',
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
    ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'],
    ARRAY['condominio_fechado', 'quintal', 'garagem_4_vagas', 'seguranca_24h', 'playground'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Loft Moderno na Vila Madalena',
    'Loft moderno e descolado na Vila Madalena. Ambiente integrado, pé direito alto, ideal para artistas e profissionais criativos. Região boêmia com muitos bares e restaurantes.',
    4000.00,
    'apartamento',
    'disponivel',
    'aluguel',
    1,
    1,
    80.00,
    80.00,
    'Rua Harmonia, 200',
    'Vila Madalena',
    'São Paulo',
    'SP',
    '05435-000',
    ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'],
    ARRAY['loft', 'pe_direito_alto', 'ambiente_integrado', 'regiao_boemia'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Casa Comercial para Escritório',
    'Casa comercial ideal para escritórios, clínicas ou consultórios. Bem localizada, com fácil acesso e estacionamento. Imóvel adaptado para uso comercial.',
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
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
    ARRAY['uso_comercial', 'estacionamento', 'facil_acesso', 'adaptado_escritorio'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Apartamento de Luxo com Vista Mar',
    'Apartamento de alto padrão com vista deslumbrante para o mar. Localizado na orla de Santos, com acabamento de luxo e área de lazer completa no prédio.',
    950000.00,
    'apartamento',
    'vendido',
    'venda',
    3,
    3,
    150.00,
    150.00,
    'Avenida Beira Mar, 300',
    'Gonzaga',
    'Santos',
    'SP',
    '11060-300',
    ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'],
    ARRAY['vista_mar', 'alto_padrao', 'area_lazer_completa', 'orla', 'portaria_24h'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
),
(
    'Chácara para Eventos',
    'Chácara ideal para eventos e festas. Amplo espaço verde, salão de festas, cozinha industrial, piscina e área para estacionamento. Ótima oportunidade de investimento.',
    1800000.00,
    'rural',
    'disponivel',
    'ambos',
    2,
    4,
    5000.00,
    300.00,
    'Estrada Rural, Km 25',
    'Zona Rural',
    'Cotia',
    'SP',
    '06700-000',
    ARRAY['https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'],
    ARRAY['eventos', 'salao_festas', 'cozinha_industrial', 'piscina', 'estacionamento_amplo'],
    'b1e97e3b-9675-4781-a925-a0a96866d69e'
);

-- =============================================
-- INSTRUÇÕES DE USO:
-- =============================================
/*
1. Substitua 'SEU_ADMIN_ID_AQUI' pelo ID real do usuário admin
2. Execute este script no SQL Editor do Supabase
3. Verifique se os dados foram inseridos corretamente
4. Teste a aplicação para ver os imóveis listados

Para encontrar o ID do admin:
SELECT id FROM admin_users WHERE email = 'seu_email@exemplo.com';
*/

-- Verificar dados inseridos
-- SELECT COUNT(*) as total_properties FROM properties;
-- SELECT type, COUNT(*) as count FROM properties GROUP BY type;
-- SELECT status, COUNT(*) as count FROM properties GROUP BY status;