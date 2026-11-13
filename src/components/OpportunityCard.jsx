import Badge from './Badge'
import Button from './Button'

// Pattern 1: lookup object for status labels
const statusLabels = {
  available: { label: 'Places available', tone: 'green' },
  full: { label: 'Fully booked', tone: 'red' },
}

export default function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  const { title, category, city, date, description, capacity, price, featured } = opportunity

  const status = capacity > 0 ? 'available' : 'full'

  // Pattern 2: precomputed JSX variable
  const priceDisplay =
    price === 0 ? (
      <Badge tone="green">Free</Badge>
    ) : (
      <span className="text-sm font-semibold text-slate-800">
        {price.toLocaleString()} RWF
      </span>
    )

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap gap-2">
        <Badge tone="gray">{category}</Badge>
        {/* Pattern 3: && with a real boolean, so no stray 0 */}
        {featured && <Badge tone="amber">Featured</Badge>}
        <Badge tone={statusLabels[status].tone}>{statusLabels[status].label}</Badge>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">
        {city} · {formattedDate}
      </p>
      <p className="mt-2 flex-1 text-sm text-slate-700">{description}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {priceDisplay}
          {/* Ternary: never prints a bare 0 */}
          <span className="text-xs text-slate-500">
            {capacity > 0 ? `${capacity} places left` : 'No places left'}
          </span>
        </div>
        <Button variant="secondary" onClick={() => onToggleSave(opportunity.id)} aria-pressed={isSaved}>
          {isSaved ? 'Unsave' : 'Save'}
        </Button>
      </div>
    </article>
  )
}