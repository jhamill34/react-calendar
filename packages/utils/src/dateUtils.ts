import {
  compareAsc,
  areIntervalsOverlapping,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
} from 'date-fns'

import { CalendarEvent, CalendarGroup } from './models'

/**
 * Determines if the date to compare is before date (inclusive).
 *
 * @param date - The reference date
 * @param dateToCompare - The relative date
 */
function isSameDayOrBefore(
  date: Date | number,
  dateToCompare: Date | number
): boolean {
  return isSameDay(date, dateToCompare) || isBefore(date, dateToCompare)
}

/**
 * Determines if the date to compare is after date (inclusive).
 *
 * @param date - The reference date
 * @param dateToCompare - The relative date
 */
function isSameDayOrAfter(
  date: Date | number,
  dateToCompare: Date | number
): boolean {
  return isSameDay(date, dateToCompare) || isAfter(date, dateToCompare)
}

/**
 * Calcuates the dates that the two intervals are overlapping.
 *
 * @param child - The child interval (generally this is an event)
 * @param parent - The parent interval
 *  (generally this is the week or span of time it fits into.)
 */
export function getOverlappingInterval(
  child: Interval,
  parent: Interval
): Interval | null {
  const result: Interval = { ...child }

  if (!isSameDayOrAfter(child.start, parent.start)) {
    result.start = parent.start
  }

  if (!isSameDayOrBefore(child.end, parent.end)) {
    result.end = parent.end
  }

  return isBefore(result.start, result.end) ? result : null
}

/**
 * Given a collection of events and intervals each
 * each each event is assigned to one (or multiple) intervals.
 *
 * @param events - The events to assign
 * @param intervals - THe intervals (i.e. buckets) we want to place events into
 */
export function assignEventsToIntervals<T extends CalendarEvent>(
  events: T[],
  intervals: Interval[]
): CalendarGroup<T>[] {
  const result: CalendarGroup<T>[] = intervals.map(interval => ({
    interval,
    events: [],
  }))

  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < result.length; j++) {
      const overlapInterval = getOverlappingInterval(
        events[i].interval,
        result[j].interval
      )

      if (overlapInterval !== null) {
        result[j].events.push({
          ...events[i],
          interval: overlapInterval,
        })
      }
    }
  }

  return result
}

/**
 * Similar to `lodash.chunk` an interval is 'chunked'
 * into a collection of intervals of the determined size.
 *
 * @param interval - The large interval to break up
 * @param chunkSize - The size of chunks in days
 */
export function chunkInterval(
  interval: Interval,
  chunkSize: number
): Interval[] {
  const result: Interval[] = []

  const days: Date[] = eachDayOfInterval(interval)
  for (let i = chunkSize; i < days.length; i += chunkSize) {
    result.push({
      start: days[i - chunkSize],
      end: days[i],
    })
  }

  return result
}

/**
 * Sorts events into groups such that we minimize the number of groups
 * and guarantee that each event does not overlap with another in it's group
 *
 * @param events - The overall collection of events
 */
export function schedule<T extends CalendarEvent>(events: T[]): T[][] {
  const sortedEvents: T[] = [...events].sort((a, b): number => {
    let result = compareAsc(a.interval.start, b.interval.start)

    if (result === 0) {
      const aDurr = eachDayOfInterval(a.interval).length
      const bDurr = eachDayOfInterval(b.interval).length
      result = bDurr - aDurr
    }

    return result
  })

  const result: T[][] = []

  for (let i = 0; i < events.length; i++) {
    let levelIndex = 0

    while (
      levelIndex < result.length &&
      result[levelIndex].length > 0 &&
      areIntervalsOverlapping(
        sortedEvents[i].interval,
        result[levelIndex][result[levelIndex].length - 1].interval
      )
    ) {
      levelIndex++
    }

    if (levelIndex >= result.length) {
      result.push([sortedEvents[i]])
    } else {
      result[levelIndex].push(sortedEvents[i])
    }
  }

  return result
}
