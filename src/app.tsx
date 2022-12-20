import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DateTime, Settings as LuxonSettings } from 'luxon'
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Navigate,
} from 'react-router-dom'
import { RequireAuthenticated } from './components/auth/proxy'
import { Landing } from './pages/landing-page'
import { Login } from './pages/login'
import { NotFound } from './pages/not-found'
import { ScheduleApp } from './pages/schedule'
import { ScheduleClasses } from './pages/schedule/classes'
import { ScheduleDashboard } from './pages/schedule/dashboard'
import { Settings } from './pages/schedule/settings'

LuxonSettings.defaultLocale = navigator.language
const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuthenticated />}>
              <Route path="/schedule" element={<ScheduleApp />}>
                <Route path="" element={<ScheduleDashboard />} />
                <Route path="classes" element={<ScheduleClasses />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
