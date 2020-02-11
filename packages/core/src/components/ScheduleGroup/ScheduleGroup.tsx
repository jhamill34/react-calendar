/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import { CalendarEvent, schedule } from '@react-calendar/utils'

import { CalendarEventPropType } from '../propTypes'

type ScheduleGroupProps<T extends CalendarEvent> = {
  /**
   * An array of events to be displayed
   *
   * Where `T` is a type that extends CalendarEvent
   */
  events: T[]

  /**
   * An optional prop that determines how many 'em's
   * to leave in front before rendering the event groups.
   *
   * @default 0
   */
  leadingSpace?: number

  /**
   * An optional prop that creates a cap for the number of rows
   * that get rendered. If left out then rows take up an equal amount of space.
   */
  numEventRows?: number

  /**
   * After the component computes a grouping such that no events are overlapping
   * this function gets called to delegate the rendering of that group to its parent
   * component.
   *
   * @param events - An array of events that are a subset of this component's events prop.
   */
  renderGroup: (events: T[]) => JSX.Element

  /**
   * Determines if the orientation of the row should be vertical or not.
   * This is useful when configuring a calender to be used for mobile.
   *
   * @default false
   */
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
