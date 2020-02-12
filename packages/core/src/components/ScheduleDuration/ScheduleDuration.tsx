/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

type ScheduleDurationProps = {
  /**
   * The child componets that get rendered inside this component
   */
  children?: ReactNode

  /**
   * The relative amount of space to take up. Generally this means
   * `flexGrow` since this component is the child of a flex container.
   *
   * @default 1
   */
  durration?: number
}

/** */
export function ScheduleDuration(
  props: ScheduleDurationProps
): React.ReactElement {
  const { durration = 1 } = props

  return (
    <div
      css={{
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
