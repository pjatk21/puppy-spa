import { useDashboardQuery, useQuickPeekQuery } from '@codegen/graphql'
import { Button, Card, Spinner } from 'flowbite-react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAppState } from 'src/store'

type DashboardCardProps = {
  children: React.ReactNode
}

export function DashboardCard(props: DashboardCardProps) {
  return (
    <Card>
      <div className="flex flex-col justify-start min-h-[8rem] h-full">
        {props.children}
      </div>
    </Card>
  )
}

export function ScheduleDashboard() {
  const qpQuery = useQuickPeekQuery(
    {
      begin: DateTime.now().startOf('day').toISODate(),
      end: DateTime.now().startOf('day').plus({ month: 2 }).toISODate(),
      rangeEventsGroups2: ['WIs I.3 - 1w'],
    },
    { enabled: true }
  )
  const { logout } = useAppState()

  console.log(qpQuery.data)

  if (!qpQuery.data) {
    return <Spinner />
  }

  const {
    me: { name, email },
    rangeEvents,
  } = qpQuery.data

  return (
    <div className="grid gap-2 grid-flow-row md:grid-cols-3 sm:grid-cols-1">
      <DashboardCard>
        <h5 className="text-xl font-bold">Cześć, {name}!</h5>
        <p>{email}</p>
        <div className="flex-grow" />
        <Button
          onClick={() => {
            logout()
          }}
        >
          Wyloguj się
        </Button>
      </DashboardCard>
      <DashboardCard>
        <h5 className="text-xl font-bold">Najbliższe 3 zajęcia.</h5>
        {rangeEvents.slice(0, 3).map(({ code, begin }) => {
          const relative = DateTime.fromISO(begin).toRelativeCalendar()
          const time = DateTime.fromISO(begin).toLocaleString({
            timeStyle: 'short',
          })
          return (
            <p className="my-1">
              {code} {relative} o {time}
            </p>
          )
        })}
        <div className="flex-grow" />
        <Link to="/schedule/classes">
          <Button>Zobacz wszystkie zajęcia</Button>{' '}
        </Link>
      </DashboardCard>
    </div>
  )
}
