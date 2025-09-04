const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bedcxozmxfadnrpjetcu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZGN4b3pteGZhZG5ycGpldGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MjE3NjUsImV4cCI6MjA3MjQ5Nzc2NX0.qc4uAEWvC8qWYvwlVJs4CL34U_a2hjbUZEhj8B3nBtA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStoragePolicies() {
  try {
    console.log('🔍 Verificando bucket imob-bucket...');
    
    // Listar buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Erro ao listar buckets:', bucketsError);
      return;
    }
    
    console.log('📦 Buckets encontrados:', buckets.map(b => b.name));
    
    const imobBucket = buckets.find(b => b.name === 'imob-bucket');
    
    if (!imobBucket) {
      console.log('❌ Bucket imob-bucket não encontrado!');
      return;
    }
    
    console.log('✅ Bucket imob-bucket encontrado:', imobBucket);
    
    // Testar upload de um arquivo pequeno
    console.log('🧪 Testando upload...');
    
    const testFile = new Blob(['test content'], { type: 'text/plain' });
    const fileName = `test-${Date.now()}.txt`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imob-bucket')
      .upload(`test/${fileName}`, testFile);
    
    if (uploadError) {
      console.error('❌ Erro no upload:', uploadError);
      console.log('💡 Possíveis causas:');
      console.log('   - Políticas de Storage não configuradas');
      console.log('   - Bucket não é público');
      console.log('   - Usuário não autenticado');
    } else {
      console.log('✅ Upload realizado com sucesso:', uploadData);
      
      // Limpar arquivo de teste
      await supabase.storage.from('imob-bucket').remove([`test/${fileName}`]);
      console.log('🧹 Arquivo de teste removido');
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkStoragePolicies();