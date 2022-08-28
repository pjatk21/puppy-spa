import {
  RangeEventsQuery,
  ScheduledEvent,
  useInfiniteRangeEventsQuery,
} from '@codegen/graphql'
import { Button, Card, Spinner } from 'flowbite-react'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type ClassesEntryCardProps = {
  event: ScheduledEvent
}

function EventCard(props: ClassesEntryCardProps) {
  const begin = DateTime.fromISO(props.event.begin)
  const end = DateTime.fromISO(props.event.begin)

  return (
    <Card>
      <div>
        <h5 className="font-mono text-lg font-bold">{props.event.code}</h5>
        <p>{props.event.title}</p>
        <p>
          {begin.toLocaleString(DateTime.TIME_24_SIMPLE)} -{' '}
          {end.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
        <p>{props.event.room}</p>
      </div>
    </Card>
  )
}

type EventsDayProps = {
  date: DateTime
  events: ScheduledEvent[]
}

function EventsDay(props: EventsDayProps) {
  return (
    <div>
      <h3 className="text-xl font-bold">
        {props.date.toFormat('dd MMM, EEEE')}
      </h3>
      <div className="flex flex-col gap-2">
        {props.events.length === 0 && <p>Brak zajęć tego dnia.</p>}
        {props.events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  )
}

export function ScheduleClasses() {
  const dayNo = 9
  const [ref, inView, entry] = useInView()

  const currentDate = useMemo(
    () => DateTime.now().plus({ months: 1, days: 10 }).startOf('day'),
    []
  )
  const begin = currentDate
  const end = currentDate.plus({ days: dayNo })
  const scheduleQuery = useInfiniteRangeEventsQuery(
    {
      begin: begin.toISO(),
      end: end.toISO(),
      groups: ['WIs I.3 - 17c', 'WIs I.3 - 1w'],
    },
    {
      getNextPageParam(lastPage, allPages) {
        return {
          begin: begin.plus({ day: dayNo * allPages.length }).toISO(),
          end: end.plus({ day: dayNo * allPages.length }).toISO(),
        }
      },
    }
  )

  useEffect(() => {
    console.log(inView, entry)
    if (inView) {
      scheduleQuery.fetchNextPage()
    }
  }, [inView])

  const numberOfDays = (scheduleQuery.data?.pages.length ?? 0) * dayNo

  // group events by date
  const eventsByDate = useMemo(() => {
    const eventsMap = new Map<DateTime, RangeEventsQuery['rangeEvents']>()

    if (!scheduleQuery.data) return eventsMap
    const events = scheduleQuery.data.pages.reduce(
      (pv, cv) => pv.concat(cv.rangeEvents),
      [] as typeof scheduleQuery.data.pages[0]['rangeEvents']
    )

    // poulate dates
    for (const index of [...Array(numberOfDays).keys()]) {
      eventsMap.set(currentDate.plus({ day: index }), [])
    }

    for (const startDate of eventsMap.keys()) {
      const endDate = startDate.endOf('day')
      eventsMap.set(
        startDate,
        events.filter((ev) => {
          const evDate = DateTime.fromISO(ev.begin)
          return evDate >= startDate && evDate < endDate
        })
      )
    }

    return eventsMap
  }, [scheduleQuery.data])

  if (!scheduleQuery.data) return <Spinner />

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from(eventsByDate.entries()).map(
          ({ '0': date, '1': events }) => (
            <EventsDay
              key={date.toISODate()}
              date={date}
              events={events as ScheduledEvent[]}
            />
          )
        )}
      </div>
      <div ref={ref} className="h-[40px]" />
      <div>
        <Button onClick={() => scheduleQuery.fetchNextPage()}>
          Załaduj więcej
        </Button>
      </div>
    </>
  )
}
