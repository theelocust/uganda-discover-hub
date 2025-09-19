import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Food", reviews: 400 },
  { name: "Tech", reviews: 300 },
  { name: "Fashion", reviews: 200 },
  { name: "Other", reviews: 100 },
]

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-2">Reviews by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reviews" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}