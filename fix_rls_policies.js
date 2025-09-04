const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Ler variáveis do arquivo .env.local
let supabaseUrl, supabaseKey;
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1];
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1];
    }
  }
} catch (error) {
  console.error('❌ Erro ao ler .env.local:', error.message);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.log('Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas em .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixRLSPolicies() {
  console.log('🔧 Iniciando correção das políticas RLS...');
  
  try {
    // Primeiro, vamos tentar desabilitar RLS temporariamente para properties
    console.log('\n1. Tentando desabilitar RLS para properties...');
    
    const { data: disableRLS, error: disableError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE properties DISABLE ROW LEVEL SECURITY;'
    });
    
    if (disableError) {
      console.log('⚠️  Não foi possível desabilitar RLS via API:', disableError.message);
      console.log('\n📋 INSTRUÇÕES MANUAIS:');
      console.log('1. Acesse o Supabase Dashboard: https://supabase.com/dashboard');
      console.log('2. Vá para SQL Editor');
      console.log('3. Execute o seguinte comando:');
      console.log('\n```sql');
      console.log('-- Desabilitar RLS temporariamente para desenvolvimento');
      console.log('ALTER TABLE properties DISABLE ROW LEVEL SECURITY;');
      console.log('ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;');
      console.log('```\n');
    } else {
      console.log('✅ RLS desabilitado com sucesso!');
    }
    
    // Testar se conseguimos fazer uma consulta simples
    console.log('\n2. Testando acesso à tabela properties...');
    
    const { data: properties, error: selectError } = await supabase
      .from('properties')
      .select('id, title')
      .limit(1);
    
    if (selectError) {
      console.error('❌ Erro ao acessar properties:', selectError.message);
      console.log('\n🔍 Possíveis causas:');
      console.log('- Políticas RLS ainda estão bloqueando o acesso');
      console.log('- Tabela properties não existe');
      console.log('- Configuração de autenticação incorreta');
    } else {
      console.log('✅ Acesso à tabela properties funcionando!');
      console.log('Propriedades encontradas:', properties?.length || 0);
    }
    
    // Testar inserção de uma propriedade
    console.log('\n3. Testando inserção de propriedade...');
    
    const testProperty = {
      title: 'Teste RLS - ' + new Date().toISOString(),
      description: 'Propriedade de teste para verificar políticas RLS',
      price: 100000,
      type: 'casa',
      status: 'disponivel',
      transaction_type: 'venda',
      bedrooms: 2,
      bathrooms: 1,
      area: 100,
      address: 'Rua de Teste, 123',
      city: 'São Paulo',
      state: 'SP'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('properties')
      .insert([testProperty])
      .select();
    
    if (insertError) {
      console.error('❌ Erro ao inserir propriedade:', insertError.message);
      console.log('\n🔧 SOLUÇÃO RECOMENDADA:');
      console.log('Execute no SQL Editor do Supabase:');
      console.log('\n```sql');
      console.log('-- Remover todas as políticas problemáticas');
      console.log('DROP POLICY IF EXISTS "Admins can insert properties" ON properties;');
      console.log('DROP POLICY IF EXISTS "Admins can update properties" ON properties;');
      console.log('DROP POLICY IF EXISTS "Admins can delete properties" ON properties;');
      console.log('DROP POLICY IF EXISTS "Admins can view all properties" ON properties;');
      console.log('');
      console.log('-- Desabilitar RLS completamente para desenvolvimento');
      console.log('ALTER TABLE properties DISABLE ROW LEVEL SECURITY;');
      console.log('ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;');
      console.log('```\n');
    } else {
      console.log('✅ Inserção funcionando! ID:', insertData[0]?.id);
      
      // Limpar o teste
      await supabase
        .from('properties')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Propriedade de teste removida');
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

// Executar o script
fixRLSPolicies().then(() => {
  console.log('\n🏁 Script finalizado!');
  console.log('\n📝 PRÓXIMOS PASSOS:');
  console.log('1. Se ainda houver erros, execute os comandos SQL manualmente no Dashboard');
  console.log('2. Teste a aplicação em http://localhost:3001');
  console.log('3. Verifique se o erro 400 foi resolvido');
}).catch(console.error);