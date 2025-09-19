import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import AuthPage from './Auth/AuthPage'
import AdminLayout from './AdminLayout'
import { Loader2 } from 'lucide-react'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()

        if (profile?.is_admin) {
          setUser(session.user)
          setIsAuthenticated(true)
        }
      }
      
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()

        if (profile?.is_admin) {
          setUser(session.user)
          setIsAuthenticated(true)
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAuthenticated(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}
