import { Link } from 'react-router-dom'
import { AboutApp } from 'src/components/about'
import 'src/ui/button.sass'
import 'src/ui/alert.sass'
import { LoadingSpinning } from 'src/ui/LoadingSpinning'

function HeadBranding() {
  return (
    <div className="flex flex-col text-center gap-[20px] min-h-screen justify-center">
      <span className="text-[96pt]">🐶</span>
      <div>
        <h1
          className="font-serif italic"
          style={{
            fontSize: '54pt',
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          Puppy
        </h1>
        <AboutApp />
      </div>

      <p>Plan zajęć który to pilnuje Ciebie</p>

      <div className="flex flex-wrap flex-row gap-2 justify-center">
        <Link to="/schedule">
          <button className="button">
            <span className="min-w-[3rem]">Aplikacja</span>
          </button>
        </Link>
        <a href="/graphql">
          <button className="button">
            <span className="min-w-[3rem]">GraphQL</span>
          </button>
        </a>
      </div>
      <div className="mx-auto">
        <div className="alert">
          🚧 <b>Uwaga!</b> To jest wciąż wersja poglądowa. Część funkcji nie
          będzie działać poprawnie (a nawet część brzydko). 🚧
        </div>
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
    <div className="dark:bg-slate-800 bg-slate-100 w-full min-h-screen px-20 dark:text-white text-slate-900">
      <HeadBranding />
      <Footer />
    </div>
  )
}
