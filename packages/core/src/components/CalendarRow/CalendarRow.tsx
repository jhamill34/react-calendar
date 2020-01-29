// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type CalendarRowProps = {
  /** */
  bg?: React.ReactNode

  /** */
  fg?: React.ReactNode
}

/** */
export function CalendarRow(props: CalendarRowProps): React.ReactElement {
  return (
    <div
      role="rowgroup"
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <div
        sx={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: 'none',
          '& > *': {
            flexGrow: 1,
          },
        }}
      >
        {props.fg}
      </div>

      {props.bg}
    </div>
  )
}

CalendarRow.propTypes = {
  bg: PropTypes.node,
  fg: PropTypes.node,
}
