-- =============================================
-- ATUALIZAR IMAGENS PARA USAR BUCKET SUPABASE
-- =============================================

-- Este script substitui as URLs do Unsplash por URLs do bucket Supabase
-- Execute este script APÓS ter feito upload das imagens para o bucket 'imob-bucket'

-- IMPORTANTE: 
-- 1. Faça upload das imagens para o bucket 'imob-bucket' no Supabase Storage
-- 2. Organize as imagens em pastas por tipo: casas/, apartamentos/, terrenos/, etc.
-- 3. Execute este script para atualizar as URLs

-- Atualizar imagens da Casa Moderna no Centro
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-moderna-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-moderna-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-moderna-3.jpg'
]
WHERE title = 'Casa Moderna no Centro';

-- Atualizar imagens do Apartamento Cobertura Duplex
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/cobertura-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/cobertura-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/cobertura-3.jpg'
]
WHERE title = 'Apartamento Cobertura Duplex';

-- Atualizar imagens da Casa de Campo com Piscina
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-campo-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-campo-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-campo-3.jpg'
]
WHERE title = 'Casa de Campo com Piscina';

-- Atualizar imagens do Apartamento Compacto para Locação
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/compacto-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/compacto-2.jpg'
]
WHERE title = 'Apartamento Compacto para Locação';

-- Atualizar imagens do Terreno Comercial Estratégico
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/terrenos/comercial-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/terrenos/comercial-2.jpg'
]
WHERE title = 'Terreno Comercial Estratégico';

-- Atualizar imagens do Sobrado Familiar no Morumbi
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/sobrado-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/sobrado-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/casas/sobrado-3.jpg'
]
WHERE title = 'Sobrado Familiar no Morumbi';

-- Atualizar imagens do Loft Moderno na Vila Madalena
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/loft-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/loft-2.jpg'
]
WHERE title = 'Loft Moderno na Vila Madalena';

-- Atualizar imagens da Casa Comercial para Escritório
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/comercial/escritorio-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/comercial/escritorio-2.jpg'
]
WHERE title = 'Casa Comercial para Escritório';

-- Atualizar imagens do Apartamento de Luxo com Vista Mar
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/luxo-vista-mar-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/luxo-vista-mar-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/luxo-vista-mar-3.jpg'
]
WHERE title = 'Apartamento de Luxo com Vista Mar';

-- Atualizar imagens da Chácara para Eventos
UPDATE properties 
SET images = ARRAY[
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/rural/chacara-eventos-1.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/rural/chacara-eventos-2.jpg',
  'https://bedcxozmxfadnrpjetcu.supabase.co/storage/v1/object/public/imob-bucket/rural/chacara-eventos-3.jpg'
]
WHERE title = 'Chácara para Eventos';

-- =============================================
-- VERIFICAR ATUALIZAÇÕES
-- =============================================

-- Verificar se todas as imagens foram atualizadas
SELECT title, images[1] as primeira_imagem 
FROM properties 
ORDER BY title;

-- Verificar se ainda existem URLs do Unsplash
SELECT title, images 
FROM properties 
WHERE array_to_string(images, ',') LIKE '%unsplash%';