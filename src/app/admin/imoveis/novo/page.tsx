import PropertyForm from '@/components/admin/PropertyForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewPropertyPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Novo Imóvel</h1>
          <p className="text-gray-600 mt-2">Adicione um novo imóvel ao sistema</p>
        </div>
        
        <PropertyForm mode="create" />
      </div>
    </div>
  )
}