// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type ScheduleDurationProps = {
  /** */
  children?: React.ReactNode

  /** */
  durration?: number
}

/** */
export function ScheduleDuration(
  props: ScheduleDurationProps
): React.ReactElement {
  const { durration = 1 } = props

  return (
    <div
      sx={{
        display: 'flex',
        flexGrow: durration,
        flexShrink: 1,
        flexBasis: 0,
        '& > *': {
          flexGrow: 1,
        },
      }}
    >
      {props.children}
    </div>
  )
}

ScheduleDuration.propTypes = {
  children: PropTypes.node,
  durration: PropTypes.number,
}
