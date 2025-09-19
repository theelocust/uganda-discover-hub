import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Review = {
  id: string
  business_id: string
  user: string
  rating: number
  comment: string
  created_at: string
}

type Business = {
  id: string
  name: string
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filters, setFilters] = useState<{ businessId: string | 'all'; rating: number | 'all' }>({ businessId: 'all', rating: 'all' })

  useEffect(() => {
    let alive = true
    const fetchAll = async () => {
      setLoading(true)
      const [bizRes, revRes] = await Promise.all([
        supabase.from('businesses').select('id, name').order('name', { ascending: true }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      ])
      if (!alive) return
      if (bizRes.error) console.error(bizRes.error)
      if (revRes.error) console.error(revRes.error)
      setBusinesses((bizRes.data || []) as Business[])
      setReviews((revRes.data || []) as Review[])
      setLoading(false)
    }
    fetchAll()
    return () => {
      alive = false
    }
  }, [])

  const businessIdToName = useMemo(() => {
    const map = new Map<string, string>()
    for (const b of businesses) map.set(b.id, b.name)
    return map
  }, [businesses])

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const byBusiness = filters.businessId === 'all' || r.business_id === filters.businessId
      const byRating = filters.rating === 'all' || r.rating === filters.rating
      return byBusiness && byRating
    })
  }, [reviews, filters])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this review?')
    if (!confirmed) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
            <p className="text-gray-600">Moderate and manage all user reviews</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filters.businessId}
              onChange={(e) => setFilters((f) => ({ ...f, businessId: e.target.value as any }))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="all">All Businesses</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <select
              value={filters.rating}
              onChange={(e) => setFilters((f) => ({ ...f, rating: e.target.value === 'all' ? 'all' : Number(e.target.value) }))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="all">All Ratings</option>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Business</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Comment</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-4 py-6" colSpan={6}>Loading...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6" colSpan={6}>No reviews found.</td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-t align-top">
                      <td className="px-4 py-3">{businessIdToName.get(r.business_id) || '—'}</td>
                      <td className="px-4 py-3">{r.user}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{r.rating}</span>
                      </td>
                      <td className="px-4 py-3 max-w-[420px]">
                        <p className="truncate" title={r.comment}>{r.comment}</p>
                      </td>
                      <td className="px-4 py-3">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(r.id)} className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


