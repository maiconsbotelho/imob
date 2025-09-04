const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bedcxozmxfadnrpjetcu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZGN4b3pteGZhZG5ycGpldGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MjE3NjUsImV4cCI6MjA3MjQ5Nzc2NX0.qc4uAEWvC8qWYvwlVJs4CL34U_a2hjbUZEhj8B3nBtA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  try {
    console.log('🔧 Criando bucket imob-bucket...');
    
    // Criar o bucket
    const { data, error } = await supabase.storage.createBucket('imob-bucket', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (error) {
      console.error('❌ Erro ao criar bucket:', error);
      
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Bucket já existe, verificando configurações...');
      } else if (error.message.includes('permission')) {
        console.log('❌ Erro de permissão. Você precisa:');
        console.log('   1. Usar uma chave de serviço (service_role) ao invés da chave anon');
        console.log('   2. Ou criar o bucket manualmente no Dashboard do Supabase');
        console.log('   3. Dashboard: https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/buckets');
        return;
      }
    } else {
      console.log('✅ Bucket criado com sucesso:', data);
    }
    
    // Verificar se o bucket existe agora
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Erro ao listar buckets:', listError);
      return;
    }
    
    const imobBucket = buckets.find(b => b.name === 'imob-bucket');
    
    if (imobBucket) {
      console.log('✅ Bucket imob-bucket confirmado:', imobBucket);
      
      // Testar upload
      console.log('🧪 Testando upload no bucket...');
      
      const testFile = new Blob(['test content'], { type: 'text/plain' });
      const fileName = `test-${Date.now()}.txt`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('imob-bucket')
        .upload(`test/${fileName}`, testFile);
      
      if (uploadError) {
        console.error('❌ Erro no upload:', uploadError);
        console.log('💡 Para resolver:');
        console.log('   1. Acesse: https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/policies');
        console.log('   2. Crie uma política para permitir uploads públicos');
        console.log('   3. Ou configure RLS adequadamente');
      } else {
        console.log('✅ Upload funcionando!', uploadData);
        
        // Limpar arquivo de teste
        await supabase.storage.from('imob-bucket').remove([`test/${fileName}`]);
        console.log('🧹 Arquivo de teste removido');
      }
    } else {
      console.log('❌ Bucket ainda não encontrado após criação');
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createBucket();

console.log('\n📋 INSTRUÇÕES MANUAIS:');
console.log('Se o script não conseguir criar o bucket automaticamente:');
console.log('1. Acesse: https://supabase.com/dashboard/project/bedcxozmxfadnrpjetcu/storage/buckets');
console.log('2. Clique em "New bucket"');
console.log('3. Nome: imob-bucket');
console.log('4. Marque "Public bucket"');
console.log('5. Clique em "Create bucket"');
console.log('6. Vá para Storage > Policies');
console.log('7. Crie uma política para permitir uploads públicos');