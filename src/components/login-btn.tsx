import { useLoginGoogleMutation, useMeQuery } from '@codegen/graphql'
import { useGoogleLogin } from '@react-oauth/google'
import { Button, Spinner, Toast } from 'flowbite-react'
import { useState } from 'react'
import { useTimeout } from 'usehooks-ts'
import { ClipboardIcon, CheckCircleIcon } from '@heroicons/react/20/solid/'
import { Transition } from '@headlessui/react'
import { useAppState } from 'src/store'

export function LoginButton() {
  const setToken = useAppState((state) => state.setToken)
  const authToken = useAppState((state) => state.authToken)
  const loginMutation = useLoginGoogleMutation()
  const meQuery = useMeQuery(undefined, { retry: 3, enabled: false })
  const [loginPending, setLoginPending] = useState(false)
  const [copied, setCopied] = useState(false)
  useTimeout(() => {
    if (loginPending) setLoginPending(false)
  }, 90 * 1000)

  const login = useGoogleLogin({
    onSuccess: ({ code }) => {
      loginMutation.mutate({ code })
      setLoginPending(false)
    },
    onError: ({ error_description }) => {
      alert(error_description)
      setLoginPending(false)
    },
    flow: 'auth-code',
  })

  const clickHandle = () => {
    if (!loginMutation.data) return
    navigator.clipboard.writeText(loginMutation.data.oauth2.google.token)
    setCopied(true)
  }

  if (authToken) {
    meQuery.refetch()
    if (meQuery.isLoading)
      return (
        <Button>
          <Spinner light />
        </Button>
      )
    if (meQuery.error || !meQuery.data) {
      return <Button color={'failure'}>error!</Button>
    }
    return (
      <Button color={'success'} disabled={true}>
        Zalogowany jako {meQuery.data.me.name}
      </Button>
    )
  }

  if (loginMutation.data) {
    setToken(loginMutation.data.oauth2.google.token)
    return (
      <Button onClick={clickHandle} color={'success'}>
        <div className="h-5 w-5 mr-3">
          <ClipboardIcon />
        </div>
        {copied ? 'Skopiowano :D' : 'Skopiuj token'}
      </Button>
    )
  }

  return (
    <Button
      onClick={() => {
        login()
        setLoginPending(true)
      }}
    >
      {loginPending && (
        <div className="mr-3">
          <Spinner light size={'sm'} />
        </div>
      )}
      Zaloguj się
    </Button>
  )
}
