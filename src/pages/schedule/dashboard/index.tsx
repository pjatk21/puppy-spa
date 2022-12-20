import { useDashboardQuery, useQuickPeekQuery } from '@codegen/graphql'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAppState } from 'src/store'

type CardProps = {
  children: React.ReactNode
  title: string
}

function Card(props: CardProps) {
  return (
    <div className="bg-slate-800 border border-slate-500 rounded flex flex-col gap-2 p-4 text-white overflow-hidden drop-shadow-lg text-ellipsis select-none">
      <h3 className="text-[16pt] font-extrabold">{props.title}</h3>
      <div className="w-full">{props.children}</div>
    </div>
  )
}

export function ScheduleDashboard() {
  return (
    <>
      <p className="text-white font-serif italic text-[36pt] mb-4">Kokpit</p>
      <div className="grid gap-2 grid-flow-row md:grid-cols-3 sm:grid-cols-1">
        <Card title="Następne zajęcia">
          <p className="italic">brak nadchodzących zajęć</p>
        </Card>
        <Card title="Następne kolokwia">
          <p className="italic">brak nadochodzących kolokwiów</p>
        </Card>
      </div>
    </>
  )
}
