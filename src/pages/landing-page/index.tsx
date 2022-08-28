import { Alert, Button, Spinner } from 'flowbite-react'
import { AboutApp } from 'src/components/about'
import { LoginButton } from 'src/components/login-btn'

function HeadBranding() {
  return (
    <div className="flex flex-col text-center gap-[20px] min-h-screen justify-center">
      <span className="text-[96pt]">🐶</span>
      <div>
        <h1 className="text-5xl font-bold">Puppy</h1>
        <AboutApp />
      </div>

      <p>Plan zajęć który to pilnuje Ciebie</p>

      <div className="flex flex-wrap flex-row gap-2 justify-center">
        <Button href="/app">
          <span className="min-w-[3rem]">Aplikacja</span>
        </Button>
        <Button href="/graphql">
          <span className="min-w-[3rem]">GraphQL</span>
        </Button>
        <LoginButton />
      </div>
      <div className="mx-auto">
        <Alert color={'warning'}>
          🚧 <b>Uwaga!</b> To jest wciąż wersja poglądowa. Część funkcji nie
          będzie działać poprawnie. 🚧
        </Alert>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-4">
      <div className="rounded-xl py-4 px-12 dark:bg-slate-900 bg-slate-300 shadow-2xl mx-auto w-fit flex flex-row gap-8">
        <div>
          Stworzone przez{' '}
          <a className="link" href="https://github.com/pjatk21">
            @kpostekk
          </a>
        </div>
        <div className="flex flex-col gap-1 text-slate-500">
          <a className="link" href="https://github.com/pjatk21/puppy-api">
            Github
          </a>
          <a className="link" href="https://altapi.kpostek.dev">
            Altapi
          </a>
          <a className="link" href="https://discord.gg/pjatk-samorzad-official">
            Discord
          </a>
          <a className="link" href="https://revolut.me/kpostekk">
            Donate
          </a>
        </div>
      </div>
    </footer>
  )
}

export function Landing() {
  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-full min-h-screen px-20 dark:text-white text-slate-900">
      <HeadBranding />
      <Footer />
    </div>
  )
}
