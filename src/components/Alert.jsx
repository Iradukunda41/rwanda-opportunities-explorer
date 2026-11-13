const tones = {
  error: 'border-red-300 bg-red-50 text-red-800',
  info: 'border-emerald-300 bg-emerald-50 text-emerald-800',
}

export default function Alert({ tone = 'info', title, children, action }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-lg border p-4 ${tones[tone]}`}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm">{children}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}