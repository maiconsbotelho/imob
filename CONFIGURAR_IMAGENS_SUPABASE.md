# Configurar Imagens no Bucket Supabase

## Problema Identificado

As imagens dos imóveis estão usando URLs do Unsplash, o que causa o erro `Invalid src prop` no Next.js. As imagens devem vir do bucket `imob-bucket` do Supabase.

## Solução

### 1. Criar o Bucket no Supabase

1. Acesse o **Supabase Dashboard**
2. Vá para **Storage** no menu lateral
3. Clique em **Create bucket**
4. Nome do bucket: `imob-bucket`
5. Marque como **Public bucket** ✅
6. Clique em **Create bucket**

### 2. Organizar Estrutura de Pastas

Crie as seguintes pastas dentro do bucket `imob-bucket`:

```
imob-bucket/
├── casas/
├── apartamentos/
├── terrenos/
├── comercial/
└── rural/
```

### 3. Fazer Upload das Imagens

#### Opção A: Upload Manual via Dashboard

1. No Supabase Storage, entre no bucket `imob-bucket`
2. Crie as pastas mencionadas acima
3. Faça upload de imagens para cada pasta:

**Para casas/:**
- `casa-moderna-1.jpg`, `casa-moderna-2.jpg`, `casa-moderna-3.jpg`
- `casa-campo-1.jpg`, `casa-campo-2.jpg`, `casa-campo-3.jpg`
- `sobrado-1.jpg`, `sobrado-2.jpg`, `sobrado-3.jpg`

**Para apartamentos/:**
- `cobertura-1.jpg`, `cobertura-2.jpg`, `cobertura-3.jpg`
- `compacto-1.jpg`, `compacto-2.jpg`
- `loft-1.jpg`, `loft-2.jpg`
- `luxo-vista-mar-1.jpg`, `luxo-vista-mar-2.jpg`, `luxo-vista-mar-3.jpg`

**Para terrenos/:**
- `comercial-1.jpg`, `comercial-2.jpg`

**Para comercial/:**
- `escritorio-1.jpg`, `escritorio-2.jpg`

**Para rural/:**
- `chacara-eventos-1.jpg`, `chacara-eventos-2.jpg`, `chacara-eventos-3.jpg`

#### Opção B: Usar Imagens de Exemplo

Se não tiver imagens próprias, você pode:
1. Baixar imagens gratuitas de sites como Pexels ou Pixabay
2. Renomear conforme a estrutura acima
3. Fazer upload para o bucket

### 4. Atualizar URLs no Banco de Dados

1. **Primeiro, encontre sua URL do Supabase:**
   - No Dashboard do Supabase, vá em **Settings** > **API**
   - Copie a **URL** (algo como: `https://abc123.supabase.co`)

2. **Edite o arquivo `update_images_supabase.sql`:**
   - Substitua `bedcxozmxfadnrpjetcu` pela sua URL real
   - Exemplo: `https://abc123.supabase.co`

3. **Execute o script no SQL Editor:**
   - Vá para **SQL Editor** no Supabase Dashboard
   - Abra o arquivo `update_images_supabase.sql`
   - Substitua todas as ocorrências de `bedcxozmxfadnrpjetcu`
   - Execute o script

### 5. Verificar Configuração

1. **Confirme que o `next.config.mjs` está correto:**
   ```javascript
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '*.supabase.co',
           port: '',
           pathname: '/storage/v1/object/public/**',
         },
       ],
     },
   };
   ```

2. **Teste uma URL de imagem:**
   - Abra no navegador: `https://SUA_URL.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-moderna-1.jpg`
   - Deve exibir a imagem

### 6. Testar a Aplicação

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:3000`
3. Verifique se as imagens dos imóveis estão carregando corretamente
4. Não deve mais aparecer o erro `Invalid src prop`

## Estrutura Final das URLs

Após a configuração, as URLs das imagens serão:

```
https://SUA_URL.supabase.co/storage/v1/object/public/imob-bucket/casas/casa-moderna-1.jpg
https://SUA_URL.supabase.co/storage/v1/object/public/imob-bucket/apartamentos/cobertura-1.jpg
https://SUA_URL.supabase.co/storage/v1/object/public/imob-bucket/terrenos/comercial-1.jpg
```

## Troubleshooting

### Se as imagens não carregarem:

1. **Verifique se o bucket é público:**
   - No Storage, clique no bucket `imob-bucket`
   - Vá em **Settings**
   - Confirme que **Public** está marcado

2. **Verifique as políticas RLS:**
   ```sql
   -- No SQL Editor, execute:
   SELECT * FROM storage.policies WHERE bucket_id = 'imob-bucket';
   ```

3. **Crie política pública se necessário:**
   ```sql
   INSERT INTO storage.policies (id, bucket_id, policy_name, policy_definition)
   VALUES (
     'public-read-imob-bucket',
     'imob-bucket',
     'Public read access',
     'SELECT'
   );
   ```

### Se ainda houver erro de hostname:

1. Verifique se a URL no `next.config.mjs` está correta
2. Reinicie o servidor de desenvolvimento
3. Limpe o cache do navegador

## Próximos Passos

Após configurar as imagens:
1. Teste o upload de novas imagens via painel admin
2. Verifique se as imagens são salvas no bucket correto
3. Confirme que as políticas de acesso estão funcionando