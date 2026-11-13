import Button from './Button'

export default function StatusDemoControls({ demoStatus, onChange }) {
  return (
    <section
      aria-label="Demo of loading and error states"
      className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <p className="mr-2 text-sm font-medium text-slate-700">
        {`Demo status: ${demoStatus}`}
      </p>
      <Button variant="secondary" onClick={() => onChange('loading')} aria-pressed={demoStatus === 'loading'}>
        Show loading
      </Button>
      <Button variant="secondary" onClick={() => onChange('error')} aria-pressed={demoStatus === 'error'}>
        Show error
      </Button>
      <Button onClick={() => onChange('ready')} aria-pressed={demoStatus === 'ready'}>
        Back to ready
      </Button>
    </section>
  )
}