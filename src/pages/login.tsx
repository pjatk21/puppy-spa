import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginButton } from 'src/components/login-btn'
import { useAppState } from 'src/store'
import { LoadingSpinning } from 'src/ui/LoadingSpinning'
import 'src/ui/alert.sass'

export function Login() {
  const navigate = useNavigate()
  const searchParamsRaw = useLocation().search
  const searchParams = new URLSearchParams(searchParamsRaw)
  const authToken = useAppState((state) => state.authToken)

  useEffect(() => {
    if (authToken) {
      setTimeout(
        () => navigate(searchParams.get('redirect') ?? '/schedule'),
        500
      )
    }
  }, [authToken])

  return (
    <div className="flex flex-col h-screen w-screen justify-center dark:bg-slate-800 bg-slate-100 tes">
      <div className="w-[400px] p-12 flex flex-col gap-2">
        <h1 className="text-2xl font-bold dark:text-white text-slate-900">
          Zaloguj się do Puppy
        </h1>
        <LoginButton />
        {!!authToken && (
          <div className="alert bg-blue-200 border-blue-500 flex gap-2 items-center">
            Zalogowano użytkownika. Zaraz nastąpi przekierowanie...
            <span className="px-1">
              <LoadingSpinning />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
