const placeholderIds = ['s1', 's2', 's3', 's4', 's5', 's6']

export default function LoadingState() {
  return (
    <div role="status" aria-live="polite">
      <p className="mb-3 text-sm font-medium text-slate-700">Loading opportunities...</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderIds.map((id) => (
          <li
            key={id}
            className="h-44 animate-pulse rounded-lg border border-slate-200 bg-slate-200"
          />
        ))}
      </ul>
    </div>
  )
}