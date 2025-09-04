-- Script para corrigir as políticas RLS e resolver a recursão infinita
-- =============================================

-- 1. REMOVER TODAS AS POLÍTICAS EXISTENTES
-- =============================================
DROP POLICY IF EXISTS "Users can view own admin record" ON admin_users;
DROP POLICY IF EXISTS "Super admins can view all admin records" ON admin_users;
DROP POLICY IF EXISTS "Super admins can insert admin records" ON admin_users;
DROP POLICY IF EXISTS "Super admins can update admin records" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all properties" ON properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON properties;
DROP POLICY IF EXISTS "Admins can update properties" ON properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON properties;
DROP POLICY IF EXISTS "Public can view available properties" ON properties;

-- 2. DESABILITAR RLS TEMPORARIAMENTE PARA admin_users
-- =============================================
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 3. CRIAR POLÍTICAS SIMPLES PARA properties (SEM RECURSÃO)
-- =============================================

-- Política pública para leitura de propriedades disponíveis
CREATE POLICY "Public can view available properties" ON properties
    FOR SELECT USING (status = 'disponivel');

-- Política para admins autenticados (usando auth.role() se disponível)
-- Ou permitir acesso total para usuários autenticados
CREATE POLICY "Authenticated users can manage properties" ON properties
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. ALTERNATIVA: DESABILITAR RLS COMPLETAMENTE PARA DESENVOLVIMENTO
-- =============================================
-- Se ainda houver problemas, descomente as linhas abaixo:
-- ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

COMMIT;