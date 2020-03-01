/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import {
  chunkInterval,
  assignEventsToIntervals,
  CalendarGroup,
  CalendarEvent,
} from '@react-calendar/utils'
import { CalendarEventPropType, IntervalPropType } from '../propTypes'

type CalendarProps<T extends CalendarEvent> = {
  /**
   * An array of events to be displayed
   *
   * Where `T` is a type that extends CalendarEvent
   */
  events: T[]

  /**
   * The number of "groups" or in general how many days to render
   * per group in this calendar.
   *
   * @default 7
   */
  groupSize?: number

  /**
   * The node to render as the header for the calendar.
   */
  heading: ReactNode

  /**
   * The range for the calendar to schedule events within.
   *
   * **Note** this interval is inclusive of start and exclusive of end.
   * The dates that are computed are in the range [Start, End)
   */
  interval: Interval

  /**
   * After computing the calendar groups, this method
   * gets called for each one to delegate its display properties.
   *
   * @param group - The calendar group that will be displayed
   * @returns ReactElement
   */
  renderEventGroup: (group: CalendarGroup<T>) => JSX.Element
}

/** */
export function Calendar<T extends CalendarEvent>(
  props: CalendarProps<T>
): React.ReactElement {
  const { interval, groupSize = 7, events } = props

  const intervals: Interval[] = chunkInterval(interval, groupSize)
  const groups: CalendarGroup<T>[] = assignEventsToIntervals(events, intervals)

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          flexGrow: 1,
        },
      }}
      role="grid"
    >
      {props.heading}
      {groups.map((group, index) =>
        React.cloneElement(props.renderEventGroup(group), {
          key: `event-group-${index}`,
        })
      )}
    </div>
  )
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(CalendarEventPropType).isRequired)
    .isRequired,
  groupSize: PropTypes.number,
  heading: PropTypes.node,
  interval: PropTypes.shape(IntervalPropType).isRequired,
  renderEventGroup: PropTypes.func.isRequired,
}
