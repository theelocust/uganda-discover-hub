import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search, UserCheck, UserX, Mail, Calendar } from 'lucide-react'

type User = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
  created_at: string
  last_sign_in_at?: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users
    const query = searchQuery.toLowerCase()
    return users.filter(user => 
      user.full_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }, [users, searchQuery])

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      setActionLoading(userId)
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId)

      if (error) throw error

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, is_admin: !currentStatus }
          : user
      ))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      setActionLoading(userId)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error

      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const adminCount = users.filter(u => u.is_admin).length
  const regularUserCount = users.filter(u => !u.is_admin).length

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{adminCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Regular Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{regularUserCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          {searchQuery ? 'No users found matching your search.' : 'No users found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{user.full_name}</div>
                                <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {user.email}
                            </div>
                          </td>
                          <td className="py-4">
                            <Badge variant={user.is_admin ? "default" : "secondary"}>
                              {user.is_admin ? 'Admin' : 'User'}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {new Date(user.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant={user.is_admin ? "outline" : "default"}
                                onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                                disabled={actionLoading === user.id}
                              >
                                {actionLoading === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : user.is_admin ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-1" />
                                    Remove Admin
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    Make Admin
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteUser(user.id)}
                                disabled={actionLoading === user.id}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
