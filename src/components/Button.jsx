const variants = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secondary: 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50',
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${variants[variant]}`}
      {...rest}
    >
      {children}
    </button>
  )
}