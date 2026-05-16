'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import DashboardCard from '@/components/DashboardCard'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  })

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard title="Total Tasks" value={stats.total} />
          <DashboardCard title="Completed" value={stats.completed} />
          <DashboardCard title="Pending" value={stats.pending} />
          <DashboardCard title="Overdue" value={stats.overdue} />
        </div>
      </div>
    </div>
  )
}