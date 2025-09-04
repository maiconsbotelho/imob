# 🪣 Criar Bucket Manualmente no Supabase

## ❌ Problema Identificado

O bucket `imob-bucket` **NÃO EXISTE** no seu projeto Supabase, causando o erro 400 no upload de imagens. Você mencionou que o bucket existe, mas nossos testes confirmaram que ele não está presente.

## ✅ Solução: Criar Bucket Manualmente

### Passo 1: Acessar o Dashboard

1. Abra seu navegador
2. Acesse: **https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/buckets**
3. Faça login se necessário

### Passo 2: Criar o Bucket

1. Clique no botão **"New bucket"** (ou "Novo bucket")
2. Preencha os dados:
   - **Name**: `imob-bucket`
   - **Public bucket**: ✅ **MARQUE ESTA OPÇÃO**
   - **File size limit**: 5 MB (opcional)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif` (opcional)
3. Clique em **"Create bucket"**

### Passo 3: Configurar Políticas de Acesso

1. Após criar o bucket, vá para: **Storage > Policies**
2. Clique em **"New Policy"**
3. Selecione o bucket **"imob-bucket"**
4. Crie as seguintes políticas:

#### Política 1: Leitura Pública

**Passo a passo detalhado:**

1. Clique em **"New Policy"**
2. Preencha os campos:
   - **Policy name**: `Public read access`
   - **Allowed operation**: Marque apenas **SELECT** ✅
   - **Target roles**: Deixe como "Defaults to all (public) roles if none selected"
   - **Policy definition**: Digite exatamente: `true`
3. Clique em **"Review"** e depois **"Save policy"**

#### Política 2: Upload para Usuários Autenticados

**Passo a passo detalhado:**

1. Clique em **"New Policy"** novamente
2. Preencha os campos:
   - **Policy name**: `Authenticated upload`
   - **Allowed operation**: Marque apenas **INSERT** ✅
   - **Target roles**: Deixe como "Defaults to all (public) roles if none selected"
   - **Policy definition**: Digite exatamente: `auth.role() = 'authenticated'`
3. Clique em **"Review"** e depois **"Save policy"**

#### Política 3: Update para Usuários Autenticados

**Passo a passo detalhado:**

1. Clique em **"New Policy"** novamente
2. Preencha os campos:
   - **Policy name**: `Authenticated update`
   - **Allowed operation**: Marque apenas **UPDATE** ✅
   - **Target roles**: Deixe como "Defaults to all (public) roles if none selected"
   - **Policy definition**: Digite exatamente: `auth.role() = 'authenticated'`
3. Clique em **"Review"** e depois **"Save policy"**

#### Política 4: Delete para Usuários Autenticados

**Passo a passo detalhado:**

1. Clique em **"New Policy"** novamente
2. Preencha os campos:
   - **Policy name**: `Authenticated delete`
   - **Allowed operation**: Marque apenas **DELETE** ✅
   - **Target roles**: Deixe como "Defaults to all (public) roles if none selected"
   - **Policy definition**: Digite exatamente: `auth.role() = 'authenticated'`
3. Clique em **"Review"** e depois **"Save policy"**

### Passo 4: Verificar se Funcionou

1. Volte para a aplicação
2. Tente fazer upload de uma imagem na área administrativa
3. O erro 400 deve desaparecer

## 🔍 Como Verificar se o Bucket Existe

Execute este comando para confirmar:

```bash
node check_storage_policies.js
```

Se o bucket existir, você verá:
```
📦 Buckets encontrados: ['imob-bucket']
✅ Bucket imob-bucket encontrado
```

## 🎯 Dicas Importantes para Criar Políticas

### ✅ O que Marcar em "Allowed operation":
- **SELECT**: Para leitura pública ✅
- **INSERT**: Para upload de arquivos ✅  
- **UPDATE**: Para atualizar arquivos ✅
- **DELETE**: Para deletar arquivos ✅

### 📝 Definições de Política Corretas:
- **Acesso público**: `true`
- **Usuários autenticados**: `auth.role() = 'authenticated'`
- **Apenas admins**: `auth.role() = 'service_role'`

### 🔍 Como Verificar se a Política Foi Criada:
1. Após salvar, você deve ver a política listada
2. O status deve aparecer como "Active" ou "Ativa"
3. Teste fazendo upload de uma imagem na aplicação

## 🚨 Alternativa: Política Simples (Recomendada)

Se você está tendo dificuldades, crie apenas UMA política que permite tudo:

**Passo a passo:**
1. Vá para **Storage > Policies**
2. Clique em **"New Policy"**
3. Preencha:
   - **Policy name**: `Allow all operations for imob-bucket`
   - **Allowed operation**: Marque **TODAS** as opções (SELECT, INSERT, UPDATE, DELETE) ✅
   - **Target roles**: Deixe como padrão
   - **Policy definition**: Digite: `true`
4. Clique em **"Review"** e **"Save policy"**

⚠️ **Atenção**: Esta política permite que qualquer pessoa faça qualquer operação. É segura para desenvolvimento, mas considere políticas mais restritivas em produção.

## 📋 Checklist

- [ ] Acessei o Dashboard do Supabase
- [ ] Criei o bucket `imob-bucket`
- [ ] Marquei como **Public bucket**
- [ ] Configurei as políticas de acesso
- [ ] Testei o upload na aplicação
- [ ] Confirmei que o erro 400 desapareceu

## 🔗 Links Úteis

- **Storage Buckets**: https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/buckets
- **Storage Policies**: https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/policies
- **Documentação**: https://supabase.com/docs/guides/storage

---

**Após criar o bucket, execute novamente o teste de upload na aplicação para confirmar que o problema foi resolvido!**