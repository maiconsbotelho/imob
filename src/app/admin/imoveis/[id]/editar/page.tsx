import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PropertyForm from '@/components/admin/PropertyForm'
import { Property } from '@/types/property'

interface EditPropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch property data
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !property) {
    redirect('/admin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Imóvel</h1>
      <PropertyForm mode="edit" property={property as Property} />
    </div>
  )
}