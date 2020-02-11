/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { eachDayOfInterval } from 'date-fns'

import { IntervalPropType } from '../propTypes'

type DateRowProps = {
  /**
   * The interval to which to generate dates between.
   *
   * **Note** this interval is inclusive of start and exclusive of end.
   * The dates that are computed are in the range [Start, End)
   */
  interval: Interval

  /**
   * These rows *can* grow flexibly to a parent container but
   * have a minimum height that restricts them from shrinking too far.
   *
   * @default '150px'
   */
  minHeight?: string | number

  /**
   * For each date in the interval passed this function gets called
   * to delegate to this components parent how it should be rendered.
   *
   * @param date - The current date to render.
   */
  renderDate: (date: Date) => JSX.Element

  /**
   * Determines if the orientation of the row should be vertical or not.
   * This is useful when configuring a calender to be used for mobile.
   *
   * @default false
   */
  vertical?: boolean
}

/** */
export function DateRow(props: DateRowProps): React.ReactElement {
  const { interval, minHeight = '150px', vertical = false } = props
  const dates: Date[] = eachDayOfInterval(interval)
  dates.pop()

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        flexGrow: 1,
        pointerEvents: 'auto',
        minHeight,
        '& > *': {
          flexGrow: 1,
          flexBasis: 0,
        },
      }}
      role="row"
    >
      {dates.map((date, index) =>
        React.cloneElement(props.renderDate(date), { key: `date-row-${index}` })
      )}
    </div>
  )
}

DateRow.propTypes = {
  interval: PropTypes.shape(IntervalPropType).isRequired,
  minHeight: PropTypes.number,
  renderDate: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
}
