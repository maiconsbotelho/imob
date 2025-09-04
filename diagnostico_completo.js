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
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnosticoCompleto() {
  console.log('🔍 DIAGNÓSTICO COMPLETO DO ERRO 400\n');
  
  try {
    // 1. Verificar se consegue fazer SELECT
    console.log('1. 📖 Testando SELECT na tabela properties...');
    const { data: selectData, error: selectError } = await supabase
      .from('properties')
      .select('id, title, status')
      .limit(3);
    
    if (selectError) {
      console.error('❌ Erro no SELECT:', selectError.message);
      console.error('Detalhes:', selectError);
    } else {
      console.log('✅ SELECT funcionando! Registros encontrados:', selectData?.length || 0);
      if (selectData?.length > 0) {
        console.log('Exemplo:', selectData[0]);
      }
    }
    
    // 2. Testar INSERT com dados mínimos
    console.log('\n2. ➕ Testando INSERT com dados mínimos...');
    const dadosMinimos = {
      title: 'Teste Diagnóstico ' + Date.now(),
      price: 100000,
      type: 'casa',
      transaction_type: 'venda',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('properties')
      .insert([dadosMinimos])
      .select();
    
    if (insertError) {
      console.error('❌ ERRO NO INSERT:', insertError.message);
      console.error('Código:', insertError.code);
      console.error('Detalhes completos:', JSON.stringify(insertError, null, 2));
      
      // Verificar tipos específicos de erro
      if (insertError.message.includes('violates row-level security')) {
        console.log('\n🚨 PROBLEMA: Políticas RLS ainda ativas!');
        console.log('SOLUÇÃO: Execute no SQL Editor do Supabase:');
        console.log('ALTER TABLE properties DISABLE ROW LEVEL SECURITY;');
      }
      
      if (insertError.message.includes('violates check constraint')) {
        console.log('\n🚨 PROBLEMA: Violação de constraint!');
        console.log('Verifique se os valores estão dentro dos limites permitidos.');
      }
      
      if (insertError.message.includes('violates not-null constraint')) {
        console.log('\n🚨 PROBLEMA: Campo obrigatório em branco!');
        console.log('Verifique se todos os campos NOT NULL estão preenchidos.');
      }
      
      if (insertError.message.includes('violates foreign key constraint')) {
        console.log('\n🚨 PROBLEMA: Referência inválida!');
        console.log('Verifique se as chaves estrangeiras existem.');
      }
      
    } else {
      console.log('✅ INSERT funcionando! ID criado:', insertData[0]?.id);
      
      // Limpar teste
      await supabase
        .from('properties')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Registro de teste removido');
    }
    
    // 3. Verificar estrutura da tabela
    console.log('\n3. 🏗️  Verificando estrutura da tabela...');
    const { data: estrutura, error: estruturaError } = await supabase.rpc('get_table_info', {
      table_name: 'properties'
    });
    
    if (estruturaError && !estruturaError.message.includes('function')) {
      console.log('⚠️  Não foi possível verificar estrutura via RPC');
    }
    
    // 4. Testar com diferentes payloads
    console.log('\n4. 🧪 Testando diferentes payloads...');
    
    // Payload super simples
    const payloadSimples = {
      title: 'Teste Simples',
      price: 50000,
      type: 'casa',
      transaction_type: 'venda',
      address: 'Teste',
      city: 'Teste',
      state: 'SP'
    };
    
    const { error: erroSimples } = await supabase
      .from('properties')
      .insert([payloadSimples])
      .select('id');
    
    if (erroSimples) {
      console.error('❌ Erro com payload simples:', erroSimples.message);
    } else {
      console.log('✅ Payload simples funcionou!');
    }
    
    // 5. Verificar configuração do cliente
    console.log('\n5. ⚙️  Verificando configuração do cliente...');
    console.log('URL:', supabaseUrl);
    console.log('Key (primeiros 20 chars):', supabaseKey?.substring(0, 20) + '...');
    
    // 6. Testar autenticação
    console.log('\n6. 🔐 Verificando autenticação...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('⚠️  Usuário não autenticado (normal para anon key)');
    } else if (user) {
      console.log('✅ Usuário autenticado:', user.email);
    } else {
      console.log('ℹ️  Usando chave anônima');
    }
    
  } catch (error) {
    console.error('❌ Erro geral no diagnóstico:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Executar diagnóstico
diagnosticoCompleto().then(() => {
  console.log('\n🏁 DIAGNÓSTICO FINALIZADO!');
  console.log('\n📋 PRÓXIMOS PASSOS:');
  console.log('1. Analise os erros específicos acima');
  console.log('2. Execute as soluções sugeridas');
  console.log('3. Se persistir, verifique o Dashboard do Supabase');
}).catch(console.error);