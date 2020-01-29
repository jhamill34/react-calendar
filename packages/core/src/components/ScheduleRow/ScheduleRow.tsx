// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { differenceInCalendarDays } from 'date-fns'
import { CalendarEvent } from '@react-calendar/utils'

import { IntervalPropType, CalendarEventPropType } from '../propTypes'

import { ScheduleDuration } from '../ScheduleDuration'

type ScheduleRowProps<T extends CalendarEvent> = {
  /** */
  interval: Interval

  /** */
  vertical?: boolean

  /** */
  events: T[]

  /** */
  emptyElement?: React.ReactNode

  /** */
  renderEvent: (event: T) => React.ReactNode
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
