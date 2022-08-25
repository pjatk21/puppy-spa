import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Landing } from './pages/landing-page'

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
        <Landing />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
