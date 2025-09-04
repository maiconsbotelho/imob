# Configuração do Sistema Administrativo

## 📋 Pré-requisitos

1. Projeto Supabase criado
2. Variáveis de ambiente configuradas no `.env.local`
3. Bucket `imob-bucket` criado no Supabase Storage

## 🗄️ Configuração do Banco de Dados

### Passo 1: Executar Script SQL

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para seu projeto
3. Navegue até **SQL Editor**
4. Copie todo o conteúdo do arquivo `supabase-setup.sql`
5. Cole no editor e execute o script

### Passo 2: Verificar Tabelas Criadas

Após executar o script, verifique se as seguintes tabelas foram criadas:
- `admin_users`
- `properties`

## 👤 Criação do Primeiro Administrador

### Passo 1: Criar Usuário no Supabase Auth

1. No Supabase Dashboard, vá para **Authentication > Users**
2. Clique em **Add User**
3. Preencha:
   - **Email**: seu email (ex: admin@imobiliaria.com)
   - **Password**: uma senha segura
   - **Auto Confirm User**: ✅ (marque esta opção)
4. Clique em **Create User**
5. **IMPORTANTE**: Copie o **User ID** que aparece na lista

### Passo 2: Adicionar à Tabela admin_users

1. Volte ao **SQL Editor**
2. Execute o seguinte comando (substitua os valores):

```sql
INSERT INTO admin_users (id, email, role, name)
VALUES (
    'b1e97e3b-9675-4781-a925-a0a96866d69e', 
    'admin@admin.com', -- Seu email
    'super_admin',
    'Maicon'
);
```

### Exemplo Prático:

```sql
INSERT INTO admin_users (id, email, role, name)
VALUES (
    '12345678-1234-1234-1234-123456789012',
    'admin@imobiliaria.com',
    'super_admin',
    'João Silva'
);
```

## 🧪 Testando o Sistema

### Passo 1: Iniciar o Servidor

```bash
npm run dev
```

### Passo 2: Acessar a Área Admin

1. Abra o navegador em `http://localhost:3002/admin`
2. Você será redirecionado para `/admin/login`
3. Faça login com as credenciais criadas:
   - **Email**: admin@imobiliaria.com
   - **Senha**: a senha que você definiu

### Passo 3: Verificar Funcionalidades

✅ **Dashboard**: Deve carregar sem erros
✅ **Criar Imóvel**: Formulário deve funcionar
✅ **Upload de Imagens**: Deve enviar para o Supabase Storage
✅ **Listagem**: Deve mostrar imóveis criados
✅ **Edição**: Deve permitir editar imóveis
✅ **Exclusão**: Deve permitir deletar imóveis

## 🔧 Configurações Adicionais

### Configurar Bucket de Imagens

1. No Supabase Dashboard, vá para **Storage**
2. Verifique se o bucket `imob-bucket` existe
3. Se não existir, crie um novo bucket:
   - **Name**: `imob-bucket`
   - **Public**: ✅ (marque como público)

### Políticas do Storage

Execute no SQL Editor para permitir upload de imagens:

```sql
-- Política para permitir que admins façam upload
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'admin-upload-policy',
    'imob-bucket',
    'Admins can upload images',
    'EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())',
    'EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())',
    'INSERT'
);

-- Política para permitir leitura pública
INSERT INTO storage.policies (id, bucket_id, name, definition, check_definition, command)
VALUES (
    'public-read-policy',
    'imob-bucket',
    'Public can view images',
    'true',
    'true',
    'SELECT'
);
```

## 🚨 Solução de Problemas

### Erro: "User not found in admin_users"
- Verifique se o usuário foi adicionado à tabela `admin_users`
- Confirme se o User ID está correto

### Erro: "Failed to upload image"
- Verifique se o bucket `imob-bucket` existe
- Confirme se as políticas do Storage foram criadas
- Verifique as variáveis de ambiente

### Erro: "Access denied"
- Verifique se o RLS está configurado corretamente
- Confirme se as políticas foram criadas

## 📝 Próximos Passos

1. ✅ Configurar banco de dados
2. ✅ Criar primeiro admin
3. ✅ Testar login
4. ✅ Testar CRUD de imóveis
5. 🔄 Adicionar dados de teste
6. 🔄 Configurar área pública do site

## 🔐 Segurança

- ✅ RLS habilitado em todas as tabelas
- ✅ Políticas de acesso configuradas
- ✅ Apenas admins podem gerenciar imóveis
- ✅ Usuários públicos só veem imóveis disponíveis
- ✅ Upload de imagens restrito a admins

---

**Dica**: Mantenha este arquivo como referência para futuras configurações e para adicionar novos administradores ao sistema.