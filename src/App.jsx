import { useState } from 'react'
import { seedOpportunities, categories } from './data/seedOpportunities'
import Banner from './components/Banner'
import OpportunityList from './components/OpportunityList'
import OpportunityFilters from './components/OpportunityFilters'
import AddOpportunityForm from './components/AddOpportunityForm'
import StatusDemoControls from './components/StatusDemoControls'
import LoadingState from './components/LoadingState'
import SummaryDashboard from './components/SummaryDashboard'
import Alert from './components/Alert'
import Button from './components/Button'

export default function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedIds, setSavedIds] = useState([])
  const [demoStatus, setDemoStatus] = useState('ready')

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

  const addOpportunity = (newOpportunity) => {
    setOpportunities((prev) => [newOpportunity, ...prev])
    resetFilters()
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

  let content
  if (demoStatus === 'loading') {
    content = <LoadingState />
  } else if (demoStatus === 'error') {
    content = (
      <Alert
        tone="error"
        title="Something went wrong"
        action={<Button onClick={() => setDemoStatus('ready')}>Try again</Button>}
      >
        We could not load the opportunities. This is a demo error, so no real request failed.
      </Alert>
    )
  } else if (visible.length === 0) {
    content = (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="mb-4 text-slate-600">
          {savedOnly && savedIds.length === 0
            ? 'You have not saved any opportunities yet. Save one, or reset the filters.'
            : 'No opportunities match your search. Try different words or clear your filters.'}
        </p>
        <Button onClick={resetFilters}>Reset filters</Button>
      </div>
    )
  } else {
    content = (
      <OpportunityList
        opportunities={visible}
        savedIds={savedIds}
        onToggleSave={toggleSave}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <Banner total={opportunities.length} savedCount={savedIds.length} />

      <main className="mx-auto max-w-6xl px-4 pb-12">
        <SummaryDashboard opportunities={opportunities} savedCount={savedIds.length} />

        <section id="opportunities">
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
        </section>

        <div className="mt-10">
          <AddOpportunityForm categories={categories} onAddOpportunity={addOpportunity} />
          <StatusDemoControls demoStatus={demoStatus} onChange={setDemoStatus} />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        Rwanda Opportunities Explorer · Week 7 React project
      </footer>
    </div>
  )
}