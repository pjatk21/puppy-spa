import { Button } from "flowbite-react";

export function NotFound() {
  return (
    <div className="dark:bg-slate-800 bg-slate-100 w-full min-h-screen dark:text-white text-slate-900 flex flex-col gap-4 items-center justify-center">
      <p className="text-3xl font-bold">Ta strona nie istnieje</p>
      <div className="flex flex-row gap-2">
        <Button href="/">Wróć do strony głównej</Button>
        <Button href="/schedule">Wróć do planu zajęć</Button>
      </div>
    </div>
  )
}
