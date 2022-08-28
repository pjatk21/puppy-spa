import { Alert, Button, Spinner } from 'flowbite-react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginButton } from 'src/components/login-btn'
import { useAppState } from 'src/store'
import { useEffectOnce } from 'usehooks-ts'

export function Login() {
  const navigate = useNavigate()
  const searchParamsRaw = useLocation().search
  const searchParams = new URLSearchParams(searchParamsRaw)
  const authToken = useAppState((state) => state.authToken)

  useEffect(() => {
    if (authToken) {
      setTimeout(
        () => navigate(searchParams.get('redirect') ?? '/schedule'),
        1500
      )
    }
  }, [authToken])

  return (
    <div className="flex flex-col h-screen w-screen justify-center dark:bg-slate-800 bg-slate-100 tes">
      <div className="max-w-sm p-12 flex flex-col gap-2">
        {!!authToken && (
          <Alert color={'info'}>
            Zalogowano użytkownika. Zaraz nastąpi przekierowanie...
            <span className="px-1">
              <Spinner size={'xs'} />
            </span>
          </Alert>
        )}
        <h1 className="text-2xl font-bold dark:text-white text-slate-900">
          Zaloguj się do Puppy
        </h1>
        <LoginButton />
      </div>
    </div>
  )
}
