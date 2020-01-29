// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

import {
  chunkInterval,
  assignEventsToIntervals,
  CalendarGroup,
  CalendarEvent,
} from '@react-themed-calendar/utils'
import { CalendarEventPropType, IntervalPropType } from '../propTypes'

type CalendarProps<T extends CalendarEvent> = {
  /** */
  events: T[]

  /** */
  groupSize: number

  /** */
  heading: React.ReactNode

  /** */
  interval: Interval

  /** */
  renderEventGroup: (group: CalendarGroup<T>) => React.ReactElement
}

/** */
export function Calendar<T extends CalendarEvent>(
  props: CalendarProps<T>
): React.ReactElement {
  const { interval, groupSize, events } = props

  const intervals: Interval[] = chunkInterval(interval, groupSize)
  const groups: CalendarGroup<T>[] = assignEventsToIntervals(events, intervals)

  return (
    <div
      role="grid"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          flexGrow: 1,
        },
      }}
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
  groupSize: PropTypes.number.isRequired,
  heading: PropTypes.node,
  interval: PropTypes.shape(IntervalPropType).isRequired,
  renderEventGroup: PropTypes.func.isRequired,
}
