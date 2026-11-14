export default function SummaryDashboard({ opportunities, savedCount }) {
  // Calculated from existing data, not stored in state
  const total = opportunities.length
  const available = opportunities.filter((opp) => opp.capacity > 0).length
  const featured = opportunities.filter((opp) => opp.featured).length

  const stats = [
    { id: 'total', label: 'Total', value: total },
    { id: 'available', label: 'Available', value: available },
    { id: 'featured', label: 'Featured', value: featured },
    { id: 'saved', label: 'Saved', value: savedCount },
  ]

  return (
    <section aria-label="Summary" className="mb-6">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-emerald-700">{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}