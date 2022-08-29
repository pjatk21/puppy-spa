import {
  RangeEventsQuery,
  ScheduledEvent,
  useInfiniteRangeEventsQuery,
} from '@codegen/graphql'
import { Alert, Button, Card, Spinner } from 'flowbite-react'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { DateMandatoryEvent, Groupper } from './group'

export function ScheduleClasses() {
  const [ref, inView] = useInView()

  const currentDate = useMemo(() => DateTime.now(), [])
  const begin = currentDate.startOf('month')
  const end = currentDate.endOf('month')
  const scheduleQuery = useInfiniteRangeEventsQuery(
    {
      begin: begin.toISO(),
      end: end.toISO(),
      groups: ['WIs I.3 - 17c', 'WIs I.3 - 1w'],
    },
    {
      getNextPageParam(lastPage, allPages) {
        return {
          begin: begin.plus({ month: allPages.length }).toISO(),
          end: end.plus({ month: allPages.length }).toISO(),
        }
      },
    }
  )

  const eventGroupper = useMemo(() => {
    const events =
      scheduleQuery.data?.pages.reduce(
        (pv, cv) => pv.concat(cv.rangeEvents),
        [] as DateMandatoryEvent[]
      ) || []
    const groupper = new Groupper({
      startingDay: begin,
      endingDay: end
        .plus({
          months: scheduleQuery.data ? scheduleQuery.data.pages.length - 1 : 0,
        })
        .endOf('month'),
    })
    groupper.setEvents(events)
    return groupper
  }, [scheduleQuery.data])

  const lockMorePages = useMemo(
    () => (scheduleQuery.data?.pages.length ?? 0) > 2,
    [scheduleQuery.data]
  )

  useEffect(() => {
    if (inView && !lockMorePages) scheduleQuery.fetchNextPage()
  }, [inView])

  const availableMonths = useMemo(
    () => eventGroupper.getAvailableMonths(),
    [scheduleQuery.data]
  )

  if (!scheduleQuery.data) return <Spinner />

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold">Plan zajęć</h1>
      {availableMonths.map((monthDate, index) => {
        const isFirst = index === 0
        const monthGroupped = eventGroupper.getGrouppedMonth(
          monthDate.year,
          monthDate.month
        )

        const monthLabel = monthDate.toLocaleString({
          month: 'long',
          year: 'numeric',
        })

        const offset = monthGroupped.calendarStartOffset

        return (
          <div>
            <h2 className="mt-6 mb-2 font-bold text-2xl">{monthLabel}</h2>
            <div className="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
              {Array.from({ length: offset }).map(() => (
                <div className="hidden lg:block" />
              ))}
              {Array.from(monthGroupped.days.entries())
                .filter(([dayDate]) => {
                  if (!isFirst) return true
                  return DateTime.now().startOf('week') <= dayDate
                })
                .map(([day, events]) => (
                  <div className="border border-slate-500 rounded-lg dark:bg-gray-800 bg-gray-100 divide-y divide-slate-500 shadow-xl md:h-72">
                    <h3 className="p-2 text-lg text-right font-semibold">
                      <span className="text-xs">{day.toFormat('EEE')}</span>{' '}
                      {DateTime.now().startOf('day').equals(day) ? (
                        <span
                          className={'border-2 border-red-700 rounded-md p-1 '}
                        >
                          {day.toFormat('dd')}
                        </span>
                      ) : (
                        <span>{day.toFormat('dd')}</span>
                      )}
                    </h3>
                    <div className="p-2">
                      {events.length ? (
                        events.map((event) => (
                          <div>
                            <h4>{event.code}</h4>
                            <p className="text-xs">
                              {DateTime.fromISO(event.begin).toLocaleString(
                                DateTime.TIME_24_SIMPLE
                              )}{' '}
                              -{' '}
                              {DateTime.fromISO(event.end).toLocaleString(
                                DateTime.TIME_24_SIMPLE
                              )}
                            </p>
                          </div>
                        ))
                      ) : (
                        <h4 className="italic opacity-40">
                          Brak zajęć tego dnia
                        </h4>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )
      })}
      <div ref={ref} className="h-5" />
      {lockMorePages && (
        <div className="my-4">
          <Alert color={'failure'}>
            Ze względu na problemy z optymalizacją, został wprowadzony limit.
          </Alert>
        </div>
      )}
      <Button
        onClick={() => scheduleQuery.fetchNextPage()}
        disabled={scheduleQuery.isFetching || lockMorePages}
      >
        Załaduj więcej{' '}
        {scheduleQuery.isFetching && <Spinner size={'sm'} light />}
      </Button>
    </div>
  )
}
