# 🔧 Correção das Políticas RLS - Recursão Infinita

## ❌ Problema Identificado
O erro `infinite recursion detected in policy for relation "admin_users"` está ocorrendo porque as políticas RLS (Row Level Security) estão fazendo referência circular à própria tabela `admin_users`.

## ✅ Solução

### Passo 1: Acesse o Supabase Dashboard
1. Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto **bedcxozmxfadnrpjetcu**

### Passo 2: Execute o Script de Correção
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `fix_policies.sql` (criado nesta pasta)
4. Cole no editor SQL
5. Clique em **Run** para executar

### Passo 3: Verificar se Funcionou
Após executar o script, teste a aplicação:
- A página inicial deve carregar os imóveis sem erro 500
- A API deve responder corretamente

## 🔍 O que o Script Faz

1. **Remove todas as políticas problemáticas** que causavam recursão
2. **Desabilita RLS na tabela admin_users** (temporariamente)
3. **Cria políticas simples para properties**:
   - Acesso público para propriedades com status 'disponivel'
   - Acesso completo para usuários autenticados

## 🚨 Alternativa de Emergência

Se ainda houver problemas após executar o script, você pode desabilitar completamente o RLS executando:

```sql
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
```

⚠️ **Nota**: Isso remove toda a segurança, mas permite que a aplicação funcione durante o desenvolvimento.

## 📞 Próximos Passos

Após corrigir as políticas:
1. Teste a aplicação em http://localhost:3001
2. Verifique se os imóveis estão sendo exibidos
3. Se necessário, podemos implementar políticas RLS mais seguras posteriormente