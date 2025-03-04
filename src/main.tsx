import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ClerkProvider, useUser } from '@clerk/tanstack-start'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    user: undefined
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function InnerApp() {
  const { user } = useUser()
  return <RouterProvider router={router} context={{ user }} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey="pk_test_d2FybS10b3VjYW4tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA">
        <InnerApp />
      </ClerkProvider>
    </StrictMode>,
  )
}
