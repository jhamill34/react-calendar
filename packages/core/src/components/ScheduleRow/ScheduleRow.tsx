/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { differenceInCalendarDays } from 'date-fns'
import { CalendarEvent } from '@react-calendar/utils'

import { IntervalPropType, CalendarEventPropType } from '../propTypes'

import { ScheduleDuration } from '../ScheduleDuration'

type ScheduleRowProps<T extends CalendarEvent> = {
  /**
   * The interval to which to generate dates between.
   *
   * **Note** this interval is inclusive of start and exclusive of end.
   * The dates that are computed are in the range [Start, End)
   */
  interval: Interval

  /**
   * Determines if the orientation of the row should be vertical or not.
   * This is useful when configuring a calender to be used for mobile.
   *
   * @default false
   */
  vertical?: boolean

  /**
   * An array of events to be displayed
   *
   * Where `T` is a type that extends CalendarEvent
   */
  events: T[]

  /**
   * An optional prop that gets rendered in place of any spaces
   * between events.
   */
  emptyElement?: ReactNode

  /**
   * For each of the events that are passed in this method delegates
   * to the parent component how the actual event should be rendered.
   *
   * @param event - the event that is to be rendered
   */
  renderEvent: (event: T) => JSX.Element
}

/** */
export function ScheduleRow<T extends CalendarEvent>(
  props: ScheduleRowProps<T>
): React.ReactElement {
  const { events, interval, vertical = false } = props
  const eventElements: React.ReactElement[] = []

  let lastDate: Date | number = interval.start

  for (let i = 0; i < events.length; i++) {
    let durration = differenceInCalendarDays(events[i].interval.start, lastDate)

    if (durration > 0) {
      // Something Empty
      eventElements.push(
        <ScheduleDuration durration={durration} key={`empty-schedule-${i}`}>
          {props.emptyElement}
        </ScheduleDuration>
      )
    }

    durration = differenceInCalendarDays(
      events[i].interval.end,
      events[i].interval.start
    )

    // Some element
    eventElements.push(
      <ScheduleDuration
        durration={durration}
        key={`event-schedule-${events[i].id}-${i}`}
      >
        {props.renderEvent(events[i])}
      </ScheduleDuration>
    )

    lastDate = events[i].interval.end
  }

  const durration = differenceInCalendarDays(interval.end, lastDate)
  if (durration > 0) {
    // Something empty
    eventElements.push(
      <ScheduleDuration
        durration={durration}
        key={`empty-schedule-${events.length}`}
      >
        {props.emptyElement}
      </ScheduleDuration>
    )
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
      }}
    >
      {eventElements}
    </div>
  )
}

ScheduleRow.propTypes = {
  interval: PropTypes.shape(IntervalPropType).isRequired,
  vertical: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.shape(CalendarEventPropType).isRequired)
    .isRequired,
  emptyElement: PropTypes.node,
  renderEvent: PropTypes.func.isRequired,
}
