import createStore from 'zustand'
import { persist } from 'zustand/middleware'

type UserMode = 'student'

type AppState = {
  setToken: (token: string) => void
  logout: () => void
  authToken: string | null
  groups: string[]
}

type SettingsState = {
  olaMode: boolean
}

export const useAppState = createStore<AppState>()(
  persist(
    (set) => ({
      authToken: null,
      setToken(token: string) {
        set(() => ({ authToken: token }))
      },
      groups: [],
      logout() {
        set(() => ({ authToken: null, groups: [] }))
      },
    }),
    {
      name: 'app-state',
    }
  )
)

export const useSettings = createStore<SettingsState>()(
  persist(
    (set) => ({
      olaMode: false,
    }),
    {
      name: 'app-settings',
    }
  )
)
