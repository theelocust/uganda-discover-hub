import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

type AuthPageProps = {
  onAuthSuccess: () => void
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()

        if (profile?.is_admin) {
          onAuthSuccess()
        }
      }
      
      setLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()

        if (profile?.is_admin) {
          onAuthSuccess()
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [onAuthSuccess])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-primary-foreground font-bold text-2xl">F</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">FindMeUG</h1>
          <p className="text-muted-foreground">Admin Portal</p>
        </div>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm 
            onSuccess={onAuthSuccess} 
            onSwitchToSignup={() => setIsLogin(false)} 
          />
        ) : (
          <SignupForm 
            onSuccess={onAuthSuccess} 
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}

        {/* Demo Credentials */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Demo Credentials</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Email:</strong> admin@findmeug.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => {
                setIsLogin(true)
                // Auto-fill demo credentials
                const emailInput = document.getElementById('email') as HTMLInputElement
                const passwordInput = document.getElementById('password') as HTMLInputElement
                if (emailInput) emailInput.value = 'admin@findmeug.com'
                if (passwordInput) passwordInput.value = 'admin123'
              }}
            >
              Use Demo Credentials
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
