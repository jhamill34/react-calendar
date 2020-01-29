// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { eachDayOfInterval } from 'date-fns'

import { IntervalPropType } from '../propTypes'

type DateRowProps = {
  /** */
  interval: Interval

  /** */
  minHeight?: string | number

  /** */
  renderDate: (date: Date) => React.ReactElement

  /** */
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
