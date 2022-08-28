import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppState } from 'src/store'

export function RequireAuthenticated() {
  const authToken = useAppState((state) => state.authToken)
  const location = useLocation()

  if (!authToken) {
    const redirectParams = new URLSearchParams()
    if (location.pathname !== '/login') {
      redirectParams.set('redirect', location.pathname)
      return <Navigate to={'/login' + redirectParams.toString()} />
    }
    return <Navigate to="/login" />
  }

  return <Outlet />
}
