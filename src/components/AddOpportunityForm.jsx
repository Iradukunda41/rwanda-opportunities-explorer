import { useState } from 'react'
import Button from './Button'
import TextInput from './TextInput'

const emptyForm = {
  title: '',
  category: '',
  city: '',
  date: '',
  capacity: '',
  price: '',
  featured: false,
}

function validate(values) {
  const errors = {}

  if (!values.title.trim()) errors.title = 'Please enter a title.'
  else if (values.title.trim().length < 3)
    errors.title = 'The title must have at least 3 characters.'

  if (!values.category) errors.category = 'Please choose a category.'

  if (!values.city.trim()) errors.city = 'Please enter a city.'

  if (!values.date) errors.date = 'Please choose a date.'
  else if (Number.isNaN(new Date(values.date).getTime()))
    errors.date = 'Please enter a valid date.'

  if (values.capacity === '') errors.capacity = 'Please enter the number of places.'
  else if (!Number.isInteger(Number(values.capacity)) || Number(values.capacity) < 0)
    errors.capacity = 'Places must be a whole number, 0 or more.'

  if (values.price === '') errors.price = 'Please enter a price (use 0 for free).'
  else if (Number.isNaN(Number(values.price)) || Number(values.price) < 0)
    errors.price = 'The price must be 0 or more.'

  return errors
}

export default function AddOpportunityForm({ categories, onAddOpportunity }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault() // no page reload

    const foundErrors = validate(values)
    setErrors(foundErrors)

    if (Object.keys(foundErrors).length > 0) {
      setMessage('')
      return
    }

    onAddOpportunity({
      id: `opp-${crypto.randomUUID()}`, // created once, here, never during render
      title: values.title.trim(),
      category: values.category,
      city: values.city.trim(),
      date: values.date,
      description: 'Added by a visitor (sample content).',
      capacity: Number(values.capacity),
      price: Number(values.price),
      featured: values.featured,
    })

    setValues(emptyForm)
    setErrors({})
    setMessage('Opportunity added successfully.')
  }

  const handleClear = () => {
    setValues(emptyForm)
    setErrors({})
    setMessage('')
  }

  return (
    <section
      aria-labelledby="add-heading"
      className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2 id="add-heading" className="mb-3 text-lg font-semibold text-slate-900">
        Add an opportunity
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 md:grid-cols-3">
          <TextInput
            id="title"
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
          />

          <div>
            <label htmlFor="form-category" className="mb-1 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="form-category"
              name="category"
              value={values.category}
              onChange={handleChange}
              aria-invalid={errors.category ? 'true' : 'false'}
              aria-describedby={errors.category ? 'form-category-error' : undefined}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                errors.category ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Choose a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="form-category-error" className="mt-1 text-sm text-red-600">
                {errors.category}
              </p>
            )}
          </div>

          <TextInput
            id="city"
            name="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            error={errors.city}
          />

          <TextInput
            id="date"
            name="date"
            label="Date"
            type="date"
            value={values.date}
            onChange={handleChange}
            error={errors.date}
          />

          <TextInput
            id="capacity"
            name="capacity"
            label="Places available"
            type="number"
            min="0"
            value={values.capacity}
            onChange={handleChange}
            error={errors.capacity}
          />

          <TextInput
            id="price"
            name="price"
            label="Price (RWF, 0 = free)"
            type="number"
            min="0"
            value={values.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label htmlFor="featured" className="flex items-center gap-2 text-sm text-slate-700">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={values.featured}
              onChange={handleChange}
              className="h-4 w-4 accent-emerald-600"
            />
            Mark as featured
          </label>

          <div className="ml-auto flex gap-2">
            <Button type="button" variant="secondary" onClick={handleClear}>
              Clear form
            </Button>
            <Button type="submit">Add opportunity</Button>
          </div>
        </div>

        {message && (
          <p role="status" className="mt-3 text-sm font-medium text-emerald-700">
            {message}
          </p>
        )}
      </form>
    </section>
  )
}