const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Ler variáveis do .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');
const envVars = {};

envLines.forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim().replace(/"/g, '');
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase não encontradas no .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBucketOperations() {
  console.log('🔍 Testando operações do bucket...');
  
  try {
    // 1. Listar buckets existentes
    console.log('\n1. Listando buckets existentes:');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Erro ao listar buckets:', bucketsError.message);
    } else {
      console.log('✅ Buckets encontrados:', buckets.map(b => b.name));
      
      const imobBucketExists = buckets.some(b => b.name === 'imob-bucket');
      console.log(`📦 Bucket 'imob-bucket' existe: ${imobBucketExists ? '✅ SIM' : '❌ NÃO'}`);
      
      if (!imobBucketExists) {
        console.log('\n⚠️  PROBLEMA IDENTIFICADO: O bucket \'imob-bucket\' não existe!');
        console.log('\n📋 SOLUÇÃO:');
        console.log('1. Acesse o Dashboard do Supabase: https://supabase.com/dashboard');
        console.log('2. Vá para Storage > Buckets');
        console.log('3. Clique em "New bucket"');
        console.log('4. Nome: imob-bucket');
        console.log('5. Marque "Public bucket" para permitir acesso público às imagens');
        console.log('6. Clique em "Create bucket"');
        return;
      }
    }
    
    // 2. Testar upload de um arquivo fictício
    console.log('\n2. Testando upload de arquivo:');
    const testContent = 'Este é um arquivo de teste';
    const fileName = `test-${Date.now()}.txt`;
    const filePath = `properties/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('imob-bucket')
      .upload(filePath, testContent, {
        contentType: 'text/plain'
      });
    
    if (uploadError) {
      console.error('❌ Erro no upload:', uploadError.message);
      
      if (uploadError.message.includes('Bucket not found')) {
        console.log('\n⚠️  Confirma: O bucket \'imob-bucket\' não existe!');
      } else if (uploadError.message.includes('not allowed')) {
        console.log('\n⚠️  Problema de permissão: Verifique as políticas do bucket');
      }
    } else {
      console.log('✅ Upload realizado com sucesso!');
      
      // 3. Testar obtenção da URL pública
      console.log('\n3. Testando URL pública:');
      const { data } = supabase.storage
        .from('imob-bucket')
        .getPublicUrl(filePath);
      
      console.log('✅ URL pública gerada:', data.publicUrl);
      
      // 4. Limpar arquivo de teste
      console.log('\n4. Removendo arquivo de teste:');
      const { error: deleteError } = await supabase.storage
        .from('imob-bucket')
        .remove([filePath]);
      
      if (deleteError) {
        console.error('⚠️  Erro ao remover arquivo de teste:', deleteError.message);
      } else {
        console.log('✅ Arquivo de teste removido');
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

// Executar teste
testBucketOperations().then(() => {
  console.log('\n🏁 Teste concluído!');
}).catch(error => {
  console.error('❌ Erro fatal:', error.message);
});