import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type AdminDashboardProps = {
  is_admin?: boolean
}

export default function AdminDashboard({ is_admin = false }: AdminDashboardProps) {
  const barData = useMemo(
    () => [
      { name: 'Mon', reviews: 120 },
      { name: 'Tue', reviews: 200 },
      { name: 'Wed', reviews: 150 },
      { name: 'Thu', reviews: 300 },
      { name: 'Fri', reviews: 250 },
      { name: 'Sat', reviews: 180 },
      { name: 'Sun', reviews: 220 },
    ],
    []
  )

  const lineData = useMemo(
    () => [
      { name: 'Jan', users: 400 },
      { name: 'Feb', users: 460 },
      { name: 'Mar', users: 520 },
      { name: 'Apr', users: 610 },
      { name: 'May', users: 730 },
      { name: 'Jun', users: 820 },
    ],
    []
  )

  if (!is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Access restricted</h1>
          <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col gap-2 border-r border-gray-200 bg-white p-4">
          <div className="px-2 py-3 text-lg font-semibold">Admin</div>
          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">Dashboard</a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">Businesses</a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">Reviews</a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">Users</a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">Analytics</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Top bar (mobile sidebar trigger placeholder) */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="text-lg font-semibold">Admin</div>
            <button className="rounded-lg border px-3 py-2 text-sm">Menu</button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Overview of key metrics and insights</p>
          </div>

          {/* Cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Total Businesses</p>
              <p className="mt-2 text-2xl font-semibold">1,248</p>
              <p className="mt-1 text-xs text-emerald-600">+4.3% vs last week</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="mt-2 text-2xl font-semibold">8,432</p>
              <p className="mt-1 text-xs text-emerald-600">+2.1% vs last week</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="mt-2 text-2xl font-semibold">2,310</p>
              <p className="mt-1 text-xs text-emerald-600">+1.4% vs last week</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Trending Categories</p>
              <p className="mt-2 text-2xl font-semibold">Food, Tech, Fashion</p>
              <p className="mt-1 text-xs text-gray-500">Last 7 days</p>
            </div>
          </section>

          {/* Charts */}
          <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold">Reviews per Day</h2>
                <span className="text-xs text-gray-500">Last 7 days</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reviews" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold">Active Users Trend</h2>
                <span className="text-xs text-gray-500">This year</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}


