// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import { CalendarEvent, schedule } from '@react-calendar/utils'

import { CalendarEventPropType } from '../propTypes'

type ScheduleGroupProps<T extends CalendarEvent> = {
  /** */
  events: T[]

  /** */
  leadingSpace?: number

  /** */
  numEventRows?: number

  /** */
  renderGroup: (events: T[]) => React.ReactElement

  /** */
  vertical?: boolean
}

/** */
export function ScheduleGroup<T extends CalendarEvent>(
  props: ScheduleGroupProps<T>
): React.ReactElement {
  const { events, numEventRows, leadingSpace = 0, vertical = false } = props
  let rows = schedule(events)

  if (numEventRows) {
    if (rows.length >= numEventRows) {
      rows = rows.slice(0, numEventRows)
    } else {
      while (rows.length < numEventRows) {
        rows.push([])
      }
    }
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: vertical ? 'row' : 'column',
      }}
    >
      <div
        css={{
          flexBasis: leadingSpace + 'em',
          flexGrow: 0,
          flexShrink: 0,
          visibility: 'hidden',
          '& ~ *': {
            flexGrow: 1,
            flexBasis: 0,
          },
        }}
      />
      {rows.map((group, index) =>
        React.cloneElement(props.renderGroup(group), {
          key: `schedule-group-${index}`,
        })
      )}
    </div>
  )
}

ScheduleGroup.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(CalendarEventPropType).isRequired)
    .isRequired,
  leadingSpace: PropTypes.number,
  numEventRows: PropTypes.number,
  renderGroup: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
}
