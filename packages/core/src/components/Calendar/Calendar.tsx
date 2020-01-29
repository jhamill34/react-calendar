// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
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
      css={{
        height: '100%',
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
  groupSize: PropTypes.number.isRequired,
  heading: PropTypes.node,
  interval: PropTypes.shape(IntervalPropType).isRequired,
  renderEventGroup: PropTypes.func.isRequired,
}
