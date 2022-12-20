import { RangeEventsQuery, useInfiniteRangeEventsQuery } from '@codegen/graphql'
import { DateTime } from 'luxon'
import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

type ScheduledRangedEvents = RangeEventsQuery['rangeEvents']

type ScheduleDayProps = {
  date: DateTime
  events: ScheduledRangedEvents
}

const groups = ['WIs I.3 - 17c', 'WIs I.3 - 1w']

function ScheduleDay(props: ScheduleDayProps) {
  const dateHuman = useMemo(() => {
    return props.date.toFormat('cccc, d LLL')
  }, [props.date])

  return (
    <div className="text-white">
      <h2 className="font-extrabold text-[24pt]">{dateHuman}</h2>
      <div className="border-b border-b-white border-opacity-20 z-0" />
      {!props.events.length && (
        <p className="italic mt-2 mb-8">Brak zajęć tego dnia</p>
      )}
      {props.events.map((event, i) => {
        const beginHuman = DateTime.fromISO(event.begin).toLocaleString({
          timeStyle: 'short',
        })
        const endHuman = DateTime.fromISO(event.end).toLocaleString({
          timeStyle: 'short',
        })

        return (
          <div
            key={i}
            className="flex flex-col md:flex-row md:gap-0 gap-1 my-2"
          >
            <div>
              <h3 className="font-bold text-[16pt]">{event.code}</h3>
              <p className="text-sm">{event.title}</p>
            </div>
            <div className="hidden md:block md:flex-grow" />
            <div className="md:text-right">
              <p>
                od {beginHuman} do {endHuman}
              </p>
              <p>sala: {event.room}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ScheduleClasses() {
  const [ref, inView] = useInView()

  const [beginDate, endDate] = useMemo(() => {
    return [DateTime.now().startOf('day'), DateTime.now().endOf('day')] as const
  }, [])

  const infinteQuery = useInfiniteRangeEventsQuery(
    {
      begin: beginDate.toISO(),
      end: endDate.toISO(),
      groups,
    },
    {
      getNextPageParam: (last, prev) => ({
        begin: beginDate.plus({ day: prev.length }),
        end: endDate.plus({ day: prev.length }),
        groups,
      }),
    }
  )

  useEffect(() => {
    if (inView) {
      infinteQuery.fetchNextPage()
    }
  }, [infinteQuery.data?.pages.length, inView])

  return (
    <>
      <p className="text-white font-serif italic text-[36pt] mb-4">
        Plan zajęć
      </p>
      <div className="flex flex-col gap-4">
        {infinteQuery.data?.pages.map((day, i) => (
          <ScheduleDay
            key={i}
            date={beginDate.plus({ days: i })}
            events={day.rangeEvents}
          />
        ))}
      </div>

      <div className="text-white font-serif opacity-20 pt-16" ref={ref}>
        <span className="italic">you have reached dead end</span> 💀💀
      </div>
    </>
  )
}
