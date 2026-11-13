export default function TextInput({ id, label, error, ...rest }) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}