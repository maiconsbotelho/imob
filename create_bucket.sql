-- =============================================
-- CRIAR BUCKET PARA IMAGENS NO SUPABASE STORAGE
-- =============================================

-- Verificar se o bucket já existe
SELECT * FROM storage.buckets WHERE id = 'imob-bucket';

-- Criar o bucket 'imob-bucket' se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('imob-bucket', 'imob-bucket', true)
ON CONFLICT (id) DO NOTHING;

-- Verificar se o bucket foi criado
SELECT * FROM storage.buckets WHERE id = 'imob-bucket';

-- =============================================
-- CONFIGURAR POLÍTICAS DE ACESSO
-- =============================================

-- Política para permitir leitura pública
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'public-read-imob-bucket',
    'imob-bucket',
    'Public can view images',
    'true',
    'true',
    'SELECT'
)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir que usuários autenticados façam upload
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'authenticated-upload-imob-bucket',
    'imob-bucket',
    'Authenticated users can upload images',
    'auth.role() = ''authenticated''',
    'auth.role() = ''authenticated''',
    'INSERT'
)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir que usuários autenticados atualizem suas imagens
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'authenticated-update-imob-bucket',
    'imob-bucket',
    'Authenticated users can update images',
    'auth.role() = ''authenticated''',
    'auth.role() = ''authenticated''',
    'UPDATE'
)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir que usuários autenticados deletem suas imagens
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'authenticated-delete-imob-bucket',
    'imob-bucket',
    'Authenticated users can delete images',
    'auth.role() = ''authenticated''',
    'auth.role() = ''authenticated''',
    'DELETE'
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- VERIFICAR CONFIGURAÇÕES
-- =============================================

-- Verificar bucket criado
SELECT 
    id,
    name,
    public,
    created_at
FROM storage.buckets 
WHERE id = 'imob-bucket';

-- Verificar políticas criadas
SELECT 
    id,
    bucket_id,
    name,
    command
FROM storage.policies 
WHERE bucket_id = 'imob-bucket'
ORDER BY command;

-- =============================================
-- INSTRUÇÕES
-- =============================================
/*
1. Execute este script no SQL Editor do Supabase
2. Verifique se o bucket foi criado com sucesso
3. Confirme se as políticas foram aplicadas
4. Teste o upload de imagens na aplicação

Se ainda houver problemas:
1. Verifique se RLS está habilitado: ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
2. Confirme se o usuário está autenticado ao fazer upload
3. Verifique os logs de erro no Supabase Dashboard
*/