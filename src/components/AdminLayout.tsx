import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, BarChart3, Building2, MessageSquare, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setUser(profile)
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
      } else if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setUser(profile)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Businesses', href: '/admin/businesses', icon: Building2 },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading admin panel...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">F</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">FindMeUG</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <Badge variant="default" className="mt-2">
                Admin
              </Badge>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Top Bar */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="text-sm text-gray-500">
                  Welcome back, {user?.full_name}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
