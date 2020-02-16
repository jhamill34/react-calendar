/** @jsx jsx */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { startOfWeek, addWeeks, format } from 'date-fns'

import { DateRow } from '@react-calendar/core'

/** */
export enum WeekDayValues {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}

type WeekdayHeadingsProps = {
  /**
   * If set to true then headings are abbreviated.
   *
   * @default false
   */
  short?: boolean

  /**
   * Which date to start at the begining of the row
   *
   * @default WeekDayValues.SUN
   */
  weekStartsOn?: WeekDayValues
}

/**
 * Generates an interval containing a week
 *
 * @param weekStartsOn - which day of the week the week should start with
 */
function getWeekInterval(weekStartsOn: WeekDayValues): Interval {
  const today = Date.now()
  return {
    start: startOfWeek(today, { weekStartsOn }),
    end: addWeeks(startOfWeek(today, { weekStartsOn }), 1),
  }
}

/** */
export function WeekdayHeadings(
  props: WeekdayHeadingsProps
): React.ReactElement {
  const { weekStartsOn = 0, short = false } = props

  const weekInterval: Interval = useMemo(() => getWeekInterval(weekStartsOn), [
    weekStartsOn,
  ])

  return (
    <DateRow
      interval={weekInterval}
      minHeight={0}
      renderDate={(date: Date): React.ReactElement => (
        <div
          role="gridcell"
          sx={{
            variant: 'calendar.weekDayHeading',
          }}
        >
          {format(date, short ? 'EEE' : 'EEEE')}
        </div>
      )}
    />
  )
}

WeekdayHeadings.propTypes = {
  weekStartsOn: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  short: PropTypes.bool,
}
