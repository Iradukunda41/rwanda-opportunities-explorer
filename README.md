# Rwanda Opportunities Explorer

A responsive React application that helps learners discover workshops, career events, short courses and community activities around Rwanda. Visitors can view, search, filter, sort and save opportunities, and add new ones with a validated form.

All data is sample content and is fictional. There is no backend, API, database, fetch call or React Router. Everything is kept in the frontend.

## Technologies

- React 19 (function components, JSX, props, `useState`, and `useEffect` for the banner slider)
- Vite
- Tailwind CSS v4

## Setup

```bash
git clone https://github.com/Iradukunda41/rwanda-opportunities-explorer.git
cd rwanda-opportunities-explorer
npm install
npm run dev
```

Other commands:

```bash
npm run build     # create a production build
npm run preview   # preview the production build
npm run lint      # check the code with ESLint
```

## Key features

- 12 sample opportunities across 4 categories and 4 Rwandan cities (free and paid, featured and regular, full and available)
- Live search by title and city (case-insensitive, extra spaces trimmed)
- Category filter, "Available only" and "Saved only" checkboxes, all working together
- Sorting by earliest date, title A to Z, and most places available
- Result count and a Reset filters button
- Save / Unsave on each card with a live saved count
- Controlled Add Opportunity form with validation and helpful messages
- Badges for Featured, Free and Fully booked
- Empty-results message with a reset action
- Demo loading and error states
- Summary dashboard with total, available, featured and saved counts (calculated from existing data)
- Hero banner with a photo slider of the four opportunity types, call-to-action links and quick stats
- Responsive layout, labelled form fields, visible focus styles and semantic HTML

## Project structure

```
public/
  images/
    workshop.jpg
    course.jpg
    career.jpg
    community.jpg
src/
  components/
    Alert.jsx
    AddOpportunityForm.jsx
    Badge.jsx
    Banner.jsx
    Button.jsx
    ImageSlider.jsx
    LoadingState.jsx
    OpportunityCard.jsx
    OpportunityFilters.jsx
    OpportunityList.jsx
    StatusDemoControls.jsx
    SummaryDashboard.jsx
    TextInput.jsx
  data/
    seedOpportunities.js
  App.jsx
  main.jsx
  index.css
README.md
```

## Components

| Component | Purpose |
|---|---|
| `App` | Owns the main state (opportunities, filters, saved IDs, demo status) and derives the visible list |
| `Banner` | Hero section with the title, a sun illustration, call-to-action links, quick stats and the photo slider |
| `ImageSlider` | Photo slider with previous/next buttons and dots. It changes automatically and pauses on hover or focus (uses `useState` and `useEffect`) |
| `SummaryDashboard` | Shows total, available, featured and saved counts, calculated from existing data |
| `OpportunityFilters` | Search box, category and sort selects, checkboxes, result count and reset button |
| `OpportunityList` | Renders the cards with `map()` using each opportunity's stable `id` as the key |
| `OpportunityCard` | Shows one opportunity and its badges, with a Save / Unsave button |
| `AddOpportunityForm` | Controlled form with validation, a Clear form action and no page reload |
| `Button` | Reusable button with `variant` and a safe default `type="button"` |
| `Badge` | Reusable small label with a `tone` prop |
| `TextInput` | Reusable labelled input that shows its own error message |
| `Alert` | Reusable message box used for the demo error state |
| `LoadingState` | Placeholder cards for the demo loading state |
| `StatusDemoControls` | Buttons that switch the `demoStatus` state |

## Design decisions

- **Data shape:** each opportunity has `id`, `title`, `category`, `city`, `date`, `description`, `capacity`, `price` and `featured`. `capacity` is the number of places left, so `0` means fully booked. A `price` of `0` means free.
- **Keys:** every list uses a stable `id`, never the array index or `Math.random()`.
- **State ownership:** `App` holds the shared state. Child components receive data through props and send actions up through callback props.
- **Derived data:** the filtered and sorted list, and the summary counts, are calculated during rendering, not stored in state.
- **Immutable updates:** sorting uses a copy (`[...filtered].sort(...)`), saving uses `filter` and spread, and adding uses `[newItem, ...prev]`.
- **Unique IDs:** new IDs are created once in the submit handler with `crypto.randomUUID()`.
- **Conditional rendering:** ternary (places-left text, empty-state message), `&&` (Featured badge, form error messages), `if / else if` into a precomputed JSX variable (`content` in `App`), and a lookup object (`statusLabels` in `OpportunityCard`).
- **Zero bug:** counts are shown with template strings or ternaries, so a stray `0` never appears.
- **Form validation:** required text, a valid date, a whole-number capacity of 0 or more, and a price of 0 or more, each with its own message. Nothing is added when the form is invalid.
- **Accessibility:** every field has a label, buttons have an explicit `type`, focus styles are visible, and the slider can be used with the keyboard and respects the reduced-motion setting.