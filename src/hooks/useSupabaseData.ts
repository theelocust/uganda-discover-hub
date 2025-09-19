import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Dynamic Categories Hook
export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (error) {
          console.log('No categories table, using mock data')
          // Fallback to mock data if table doesn't exist
          const mockCategories = [
            { id: 1, name: 'Restaurants', icon: '🍽️', count: 120, color: 'bg-red-50 text-red-600' },
            { id: 2, name: 'Salons & Beauty', icon: '💄', count: 85, color: 'bg-pink-50 text-pink-600' },
            { id: 3, name: 'Clinics & Health', icon: '🏥', count: 65, color: 'bg-green-50 text-green-600' },
            { id: 4, name: 'Auto Services', icon: '🚗', count: 45, color: 'bg-blue-50 text-blue-600' },
            { id: 5, name: 'Shopping', icon: '🛍️', count: 90, color: 'bg-purple-50 text-purple-600' },
            { id: 6, name: 'Education', icon: '📚', count: 35, color: 'bg-yellow-50 text-yellow-600' },
            { id: 7, name: 'Entertainment', icon: '🎬', count: 25, color: 'bg-indigo-50 text-indigo-600' },
            { id: 8, name: 'Services', icon: '🔧', count: 55, color: 'bg-gray-50 text-gray-600' },
          ]
          setCategories(mockCategories)
        } else {
          setCategories(data || [])
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Dynamic Businesses Hook
export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .limit(4)
          .order('rating', { ascending: false })

        if (error) {
          console.log('No businesses table, using mock data')
          // Fallback to mock data if table doesn't exist
          const mockBusinesses = [
            {
              id: 1,
              name: "Kampala Bites Restaurant",
              category: "Restaurant",
              rating: 4.9,
              reviews: 156,
              image: "🍽️",
              location: "Kampala Central",
              featured: true
            },
            {
              id: 2,
              name: "Style Street Salon",
              category: "Beauty & Salon",
              rating: 4.8,
              reviews: 89,
              image: "💄",
              location: "Nakasero",
              featured: true
            },
            {
              id: 3,
              name: "Health First Clinic",
              category: "Medical",
              rating: 4.7,
              reviews: 203,
              image: "🏥",
              location: "Kololo",
              featured: true
            },
            {
              id: 4,
              name: "AutoCare Services",
              category: "Auto Repair",
              rating: 4.6,
              reviews: 67,
              image: "🚗",
              location: "Industrial Area",
              featured: true
            }
          ]
          setBusinesses(mockBusinesses)
        } else {
          setBusinesses(data || [])
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching businesses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  return { businesses, loading, error }
}

// Platform Stats Hook
export const usePlatformStats = () => {
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalCategories: 0,
    totalReviews: 0,
    activeUsers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Fetch real-time stats from Supabase
        const [businessesRes, categoriesRes, reviewsRes] = await Promise.all([
          supabase.from('businesses').select('id', { count: 'exact' }),
          supabase.from('categories').select('id', { count: 'exact' }),
          supabase.from('reviews').select('id', { count: 'exact' })
        ])

        setStats({
          totalBusinesses: businessesRes.count || 500,
          totalCategories: categoriesRes.count || 50,
          totalReviews: reviewsRes.count || 1000,
          activeUsers: Math.floor(Math.random() * 500) + 200 // Mock active users
        })
      } catch (err) {
        console.log('Using mock stats')
        setStats({
          totalBusinesses: 500,
          totalCategories: 50,
          totalReviews: 1000,
          activeUsers: 300
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading }
}

// Real-time Notifications Hook
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Set up real-time subscription for notifications
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev])
          setUnreadCount(prev => prev + 1)
        }
      )
      .subscribe()

    // Mock notifications for demo
    const mockNotifications = [
      { id: 1, message: 'New business registered: Kampala Bites', type: 'success', timestamp: new Date() },
      { id: 2, message: 'Review submitted for Style Street Salon', type: 'info', timestamp: new Date() },
      { id: 3, message: 'User account created', type: 'info', timestamp: new Date() }
    ]
    
    setNotifications(mockNotifications)
    setUnreadCount(2)

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { notifications, unreadCount }
}
