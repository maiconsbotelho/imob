-- =============================================
-- CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE
-- Sistema de Imobiliária
-- =============================================

-- 1. TABELA DE USUÁRIOS ADMINISTRATIVOS
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE IMÓVEIS
-- =============================================
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
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ÍNDICES PARA PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- 4. FUNÇÃO PARA ATUALIZAR updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. TRIGGERS PARA updated_at
-- =============================================
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 7. POLÍTICAS DE SEGURANÇA PARA admin_users
-- =============================================

-- Política para permitir que usuários vejam apenas seu próprio registro
CREATE POLICY "Users can view own admin record" ON admin_users
    FOR SELECT USING (auth.uid() = id);

-- Política para permitir que super_admins vejam todos os registros
CREATE POLICY "Super admins can view all admin records" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Política para permitir que super_admins insiram novos admins
CREATE POLICY "Super admins can insert admin records" ON admin_users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Política para permitir que super_admins atualizem registros
CREATE POLICY "Super admins can update admin records" ON admin_users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- 8. POLÍTICAS DE SEGURANÇA PARA properties
-- =============================================

-- Política para permitir que admins vejam todas as propriedades
CREATE POLICY "Admins can view all properties" ON properties
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid()
        )
    );

-- Política para permitir que admins insiram propriedades
CREATE POLICY "Admins can insert properties" ON properties
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid()
        )
    );

-- Política para permitir que admins atualizem propriedades
CREATE POLICY "Admins can update properties" ON properties
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid()
        )
    );

-- Política para permitir que admins deletem propriedades
CREATE POLICY "Admins can delete properties" ON properties
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid()
        )
    );

-- 9. POLÍTICA PÚBLICA PARA LEITURA DE PROPRIEDADES (SITE PÚBLICO)
-- =============================================

-- Permitir que usuários não autenticados vejam propriedades disponíveis
CREATE POLICY "Public can view available properties" ON properties
    FOR SELECT USING (status = 'disponivel');

-- 10. DADOS INICIAIS (OPCIONAL)
-- =============================================

-- Inserir primeiro super admin (substitua pelo seu email)
-- IMPORTANTE: Execute este comando APÓS criar o usuário no Supabase Auth
/*
INSERT INTO admin_users (id, email, role, name)
VALUES (
    'SEU_USER_ID_AQUI', -- Substitua pelo ID do usuário criado no Supabase Auth
    'admin@imobiliaria.com', -- Substitua pelo seu email
    'super_admin',
    'Administrador Principal'
) ON CONFLICT (id) DO NOTHING;
*/

-- =============================================
-- INSTRUÇÕES DE USO:
-- =============================================
/*
1. Copie e cole este SQL no SQL Editor do Supabase Dashboard
2. Execute o script completo
3. Crie um usuário no Supabase Auth (Authentication > Users > Add User)
4. Copie o ID do usuário criado
5. Execute o INSERT INTO admin_users com o ID correto
6. Teste o login na aplicação

Para adicionar novos admins:
1. Crie o usuário no Supabase Auth
2. Faça login como super_admin na aplicação
3. Use a interface admin para adicionar o novo usuário à tabela admin_users
*/