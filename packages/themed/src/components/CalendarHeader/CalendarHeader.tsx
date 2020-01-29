// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type CalendarHeaderProps = {
  /** */
  left?: React.ReactElement

  /** */
  right?: React.ReactElement

  /** */
  title: string
}

/** */
export function CalendarHeader(props: CalendarHeaderProps): React.ReactElement {
  const { title } = props

  return (
    <div
      sx={{
        variant: 'calendar.header',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {props.left}
      <div>{title}</div>
      {props.right}
    </div>
  )
}

CalendarHeader.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
  title: PropTypes.string.isRequired,
}
