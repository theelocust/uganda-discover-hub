import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Business = {
  id: string
  name: string
  category: string
  owner: string
  status: 'active' | 'inactive'
}

type FormState = {
  id?: string
  name: string
  category: string
  owner: string
  status: 'active' | 'inactive'
}

export default function BusinessManagement() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')
  const [sortKey, setSortKey] = useState<keyof Business>('name')
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formState, setFormState] = useState<FormState>({ name: '', category: '', owner: '', status: 'active' })
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('businesses').select('*').order('name')
      if (!isMounted) return
      if (error) {
        console.error(error)
        setBusinesses([])
      } else {
        setBusinesses((data || []) as Business[])
      }
      setLoading(false)
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sorted = [...businesses].sort((a, b) => {
      const aVal = String(a[sortKey] ?? '').toLowerCase()
      const bVal = String(b[sortKey] ?? '').toLowerCase()
      if (aVal < bVal) return sortAsc ? -1 : 1
      if (aVal > bVal) return sortAsc ? 1 : -1
      return 0
    })
    if (!q) return sorted
    return sorted.filter((b) =>
      [b.name, b.category, b.owner, b.status].some((v) => String(v).toLowerCase().includes(q))
    )
  }, [businesses, query, sortKey, sortAsc])

  const resetForm = () => setFormState({ name: '', category: '', owner: '', status: 'active' })

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (b: Business) => {
    setFormState({ id: b.id, name: b.name, category: b.category, owner: b.owner, status: b.status })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this business?')
    if (!confirmed) return
    const { error } = await supabase.from('businesses').delete().eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    setBusinesses((prev) => prev.filter((b) => b.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (formState.id) {
        const { data, error } = await supabase
          .from('businesses')
          .update({
            name: formState.name,
            category: formState.category,
            owner: formState.owner,
            status: formState.status,
          })
          .eq('id', formState.id)
          .select()
          .single()
        if (error) throw error
        setBusinesses((prev) => prev.map((b) => (b.id === data.id ? (data as Business) : b)))
      } else {
        const { data, error } = await supabase
          .from('businesses')
          .insert({
            name: formState.name,
            category: formState.category,
            owner: formState.owner,
            status: formState.status,
          })
          .select()
          .single()
        if (error) throw error
        setBusinesses((prev) => [data as Business, ...prev])
      }
      setIsModalOpen(false)
      resetForm()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const toggleSort = (key: keyof Business) => {
    if (key === sortKey) {
      setSortAsc((v) => !v)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Businesses</h1>
            <p className="text-gray-600">Manage businesses in the platform</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses..."
              className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-0"
            />
            <button onClick={openAddModal} className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">
              Add New Business
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium"><button onClick={() => toggleSort('name')}>Name</button></th>
                  <th className="px-4 py-3 font-medium"><button onClick={() => toggleSort('category')}>Category</button></th>
                  <th className="px-4 py-3 font-medium"><button onClick={() => toggleSort('owner')}>Owner</button></th>
                  <th className="px-4 py-3 font-medium"><button onClick={() => toggleSort('status')}>Status</button></th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-4 py-6" colSpan={5}>Loading...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6" colSpan={5}>No businesses found.</td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr key={b.id} className="border-t">
                      <td className="px-4 py-3">{b.name}</td>
                      <td className="px-4 py-3">{b.category}</td>
                      <td className="px-4 py-3">{b.owner}</td>
                      <td className="px-4 py-3">
                        <span className={
                          b.status === 'active'
                            ? 'inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700'
                            : 'inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600'
                        }>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditModal(b)} className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">Edit</button>
                          <button onClick={() => handleDelete(b.id)} className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{formState.id ? 'Edit Business' : 'Add New Business'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg border px-3 py-1.5 text-sm">Close</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Name</label>
                  <input
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Category</label>
                  <input
                    value={formState.category}
                    onChange={(e) => setFormState((s) => ({ ...s, category: e.target.value }))}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Owner</label>
                  <input
                    value={formState.owner}
                    onChange={(e) => setFormState((s) => ({ ...s, owner: e.target.value }))}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Status</label>
                  <select
                    value={formState.status}
                    onChange={(e) => setFormState((s) => ({ ...s, status: e.target.value as 'active' | 'inactive' }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
                  <button disabled={saving} type="submit" className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-60">
                    {saving ? 'Saving...' : formState.id ? 'Save Changes' : 'Create Business'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


