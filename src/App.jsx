import { useState } from 'react'
import { seedOpportunities, categories } from './data/seedOpportunities'
import OpportunityList from './components/OpportunityList'
import OpportunityFilters from './components/OpportunityFilters'
import Button from './components/Button'

export default function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedIds, setSavedIds] = useState([])

  const resetFilters = () => {
    setSearch('')
    setCategory('all')
    setSort('date')
    setAvailableOnly(false)
    setSavedOnly(false)
  }

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    )
  }

  const query = search.trim().toLowerCase()

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      query === '' ||
      opp.title.toLowerCase().includes(query) ||
      opp.city.toLowerCase().includes(query)
    const matchesCategory = category === 'all' || opp.category === category
    const matchesAvailable = !availableOnly || opp.capacity > 0
    const matchesSaved = !savedOnly || savedIds.includes(opp.id)
    return matchesSearch && matchesCategory && matchesAvailable && matchesSaved
  })

  const visible = [...filtered].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title)
    if (sort === 'seats') return b.capacity - a.capacity
    return a.date.localeCompare(b.date)
  })

  const content =
    visible.length === 0 ? (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="mb-3 text-slate-700">
          {savedOnly && savedIds.length === 0
            ? 'You have not saved any opportunities yet. Save one, or reset the filters.'
            : 'No opportunities match your search. Try different words or clear your filters.'}
        </p>
        <Button onClick={resetFilters}>Reset filters</Button>
      </div>
    ) : (
      <OpportunityList
        opportunities={visible}
        savedIds={savedIds}
        onToggleSave={toggleSave}
      />
    )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-emerald-700 px-4 py-6 text-white">
        <h1 className="text-2xl font-bold">Rwanda Opportunities Explorer</h1>
        <p className="text-sm text-emerald-100">Sample content: all events are fictional.</p>
        <p className="mt-2 text-sm font-medium" aria-live="polite">
          {`Saved: ${savedIds.length}`}
        </p>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <OpportunityFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          availableOnly={availableOnly}
          onAvailableOnlyChange={setAvailableOnly}
          savedOnly={savedOnly}
          onSavedOnlyChange={setSavedOnly}
          categories={categories}
          resultCount={visible.length}
          onReset={resetFilters}
        />
        {content}
      </main>
    </div>
  )
}