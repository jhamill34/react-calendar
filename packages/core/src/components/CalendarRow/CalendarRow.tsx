/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

type CalendarRowProps = {
  /**
   * A react node to render in the background. This element
   * dictates the height of the entire row.
   */
  bg?: ReactNode

  /**
   * A react node to render in a parent container that is
   * absolutly positioned.
   *
   * **Note** this element will grow flexibly to fill the container.
   */
  fg?: ReactNode
}

/** */
export function CalendarRow(props: CalendarRowProps): React.ReactElement {
  return (
    <div
      css={{
        display: 'flex',
        position: 'relative',
        '& > div:not(:first-of-type)': {
          flexGrow: 1,
        },
      }}
      role="rowgroup"
    >
      <div
        css={{
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
