import { Link } from 'react-router-dom'
import 'src/ui/button.sass'

export function NotFound() {
  return (
    <div className="dark:bg-slate-800 bg-slate-100 w-full min-h-screen dark:text-white text-slate-900 flex flex-col gap-4 items-center justify-center">
      <p className="text-3xl font-serif italic tracking-wider">
        Ta strona nie istnieje
      </p>
      <Link to="/">
        <button className="button">Powrót do strony głównej</button>
      </Link>
    </div>
  )
}
