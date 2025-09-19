import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export default function AdminAnalytics() {
  const reviewsPerCategory = useMemo(
    () => [
      { category: 'Food', reviews: 1240 },
      { category: 'Tech', reviews: 980 },
      { category: 'Fashion', reviews: 720 },
      { category: 'Health', reviews: 540 },
      { category: 'Travel', reviews: 410 },
    ],
    []
  )

  const monthlyNewBusinesses = useMemo(
    () => [
      { month: 'Jan', businesses: 30 },
      { month: 'Feb', businesses: 42 },
      { month: 'Mar', businesses: 38 },
      { month: 'Apr', businesses: 55 },
      { month: 'May', businesses: 61 },
      { month: 'Jun', businesses: 74 },
      { month: 'Jul', businesses: 69 },
      { month: 'Aug', businesses: 80 },
      { month: 'Sep', businesses: 77 },
      { month: 'Oct', businesses: 68 },
      { month: 'Nov', businesses: 59 },
      { month: 'Dec', businesses: 63 },
    ],
    []
  )

  const topRatedBusinesses = useMemo(
    () => [
      { name: 'Kampala Bites', rating: 4.9 },
      { name: 'TechHub UG', rating: 4.7 },
      { name: 'Style Street', rating: 4.6 },
      { name: 'Health First', rating: 4.5 },
    ],
    []
  )

  const pieColors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444']

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Insights across reviews and businesses</p>
        </div>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Reviews per Category</h2>
              <span className="text-xs text-gray-500">Last 12 months</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewsPerCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reviews" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Monthly New Businesses</h2>
              <span className="text-xs text-gray-500">This year</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyNewBusinesses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="businesses" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Top Rated Businesses</h2>
              <span className="text-xs text-gray-500">Average rating</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie data={topRatedBusinesses} dataKey="rating" nameKey="name" outerRadius={110} innerRadius={50}>
                    {topRatedBusinesses.map((_, idx) => (
                      <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


