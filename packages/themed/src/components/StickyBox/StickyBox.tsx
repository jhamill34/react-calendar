/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type StickyBoxProps = {
  /** */
  children: React.ReactNode
}

/** */
export function StickyBox(props: StickyBoxProps): React.ReactElement {
  return (
    <div
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
      }}
    >
      {props.children}
    </div>
  )
}

StickyBox.propTypes = {
  children: PropTypes.node,
}
