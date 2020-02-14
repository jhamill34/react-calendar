// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type CalendarHeaderProps = {
  /**
   * Node to place to the **left** of the title
   */
  left?: ReactNode

  /**
   * Node to place to the **right** of the title
   */
  right?: ReactNode

  /**
   * The main title to display
   */
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
  left: PropTypes.node,
  right: PropTypes.node,
  title: PropTypes.string.isRequired,
}
