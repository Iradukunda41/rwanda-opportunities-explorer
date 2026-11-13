import Button from './Button'

export default function OpportunityFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  availableOnly,
  onAvailableOnlyChange,
  savedOnly,
  onSavedOnlyChange,
  categories,
  resultCount,
  onReset,
}) {
  const inputClass =
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'

  return (
    <section
      aria-label="Search and filters"
      className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="search" className="mb-1 block text-sm font-medium text-slate-700">
            Search by title or city
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g. Kigali"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={inputClass}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="mb-1 block text-sm font-medium text-slate-700">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className={inputClass}
          >
            <option value="date">Earliest date</option>
            <option value="title">Title A to Z</option>
            <option value="seats">Most places available</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <label htmlFor="availableOnly" className="flex items-center gap-2 text-sm text-slate-700">
          <input
            id="availableOnly"
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => onAvailableOnlyChange(e.target.checked)}
            className="h-4 w-4 accent-emerald-600"
          />
          Available only
        </label>

        <label htmlFor="savedOnly" className="flex items-center gap-2 text-sm text-slate-700">
          <input
            id="savedOnly"
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => onSavedOnlyChange(e.target.checked)}
            className="h-4 w-4 accent-emerald-600"
          />
          Saved only
        </label>

        <p className="text-sm font-medium text-slate-800" aria-live="polite">
          {`${resultCount} ${resultCount === 1 ? 'opportunity' : 'opportunities'} found`}
        </p>

        <div className="ml-auto">
          <Button variant="secondary" onClick={onReset}>
            Reset filters
          </Button>
        </div>
      </div>
    </section>
  )
}