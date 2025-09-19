import { supabase } from './lib/supabaseClient'
import { useEffect, useState } from 'react'
import Analytics from './components/Analytics'

function App() {
  const [businesses, setBusinesses] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('businesses')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error(error)
        else setBusinesses(data || [])
      })
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Businesses</h1>
      <ul>
        {businesses.map(b => (
          <li key={b.id}>
            {b.name} — {b.location}
          </li>
        ))}
      </ul>
      <Analytics />
    </div>
  )
}

export default App
