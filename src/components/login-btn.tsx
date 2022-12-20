import { useLoginGoogleMutation, useMeQuery } from '@codegen/graphql'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useTimeout } from 'usehooks-ts'
import { Transition } from '@headlessui/react'
import { useAppState } from 'src/store'
import { LoadingSpinning } from 'src/ui/LoadingSpinning'
import 'src/ui/button.sass'

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
    if (meQuery.isLoading) return <LoadingSpinning />
    if (meQuery.error || !meQuery.data) {
      return <button className="button bg-red-500">error!</button>
    }
    return null
  }

  if (loginMutation.data) {
    setToken(loginMutation.data.oauth2.google.token)
    return null
  }

  return (
    <button
      className="button"
      onClick={() => {
        login()
        setLoginPending(true)
      }}
    >
      <div className="flex justify-center gap-2 items-center">
        {loginPending && <LoadingSpinning />}
        Zaloguj się
      </div>
    </button>
  )
}
