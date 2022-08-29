import { ScheduledEvent } from '@codegen/graphql'
import { DateTime, DateTimeUnit } from 'luxon'

export type DateMandatoryEvent = Partial<ScheduledEvent> & {
  begin: string
  end: string
}

type GroupperOptions = {
  startingDay: DateTime
  endingDay: DateTime
}

type GrouppedMonth = {
  monthDate: DateTime
  days: Map<DateTime, DateMandatoryEvent[]>
  calendarStartOffset: number
}

export class Groupper {
  public readonly startingDay: DateTime
  public readonly endingDay: DateTime
  private events: DateMandatoryEvent[] = []

  constructor(options: GroupperOptions) {
    this.startingDay = options.startingDay
    this.endingDay = options.endingDay
  }

  public setEvents(events: DateMandatoryEvent[]) {
    this.events = events.sort((x, y) => {
      const xBegin = DateTime.fromISO(x.begin)
      const yBegin = DateTime.fromISO(y.begin)
      return xBegin.diff(yBegin).milliseconds
    })
  }

  public getAvailableMonths(): DateTime[] {
    const months: DateTime[] = []
    for (
      let month = this.startingDay;
      month < this.endingDay;
      month = month.plus({ months: 1 })
    ) {
      months.push(month)
    }
    return months
  }

  public getGrouppedMonth(year: number, month: number): GrouppedMonth {
    const monthDate = DateTime.fromObject({ year, month })
    const days = new Map<DateTime, DateMandatoryEvent[]>()
    const calendarStartOffset = monthDate.startOf('month').weekday - 1

    for (let i = 0; i < monthDate.daysInMonth; i++) {
      const day = monthDate.plus({ days: i })
      days.set(
        day,
        this.events.filter((event) =>
          day.hasSame(DateTime.fromISO(event.begin), 'day')
        )
      )
    }

    return {
      monthDate,
      days,
      calendarStartOffset,
    }
  }
}
