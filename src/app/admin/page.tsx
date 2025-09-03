import AdminDashboard from '@/components/admin/AdminDashboard'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch properties for the dashboard
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard 
        initialProperties={properties || []} 
        session={session}
      />
    </div>
  )
}