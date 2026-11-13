import OpportunityCard from './OpportunityCard'

export default function OpportunityList({ opportunities, savedIds, onToggleSave }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opp) => (
        <li key={opp.id}>
          <OpportunityCard
            opportunity={opp}
            isSaved={savedIds.includes(opp.id)}
            onToggleSave={onToggleSave}
          />
        </li>
      ))}
    </ul>
  )
}