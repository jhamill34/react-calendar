// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const PATHS = {
  left:
    'M63.75,196.77,15.1,109.09a10.14,10.14,0,0,1,.18-10.15l51.65-86A10.14,10.14,0,0,1,80.85,9.45L91,15.53a10.16,10.16,0,0,1,3.48,13.93L52.36,99.59a10.14,10.14,0,0,0-.18,10.15l39.65,71.45a10.15,10.15,0,0,1-4,13.8l-10.33,5.73A10.15,10.15,0,0,1,63.75,196.77Z',
  right:
    'M45.52 196.77l48.65-87.68A10.17 10.17 0 0094 98.94l-51.65-86a10.16 10.16 0 00-13.94-3.49l-10.12 6.08a10.15 10.15 0 00-3.48 13.93l42.1 70.13a10.14 10.14 0 01.17 10.15l-39.64 71.45A10.15 10.15 0 0021.39 195l10.33 5.73a10.15 10.15 0 0013.8-3.96z',
}

type ChevronProps = {
  /** Which direction the chevron should indicate */
  direction: 'left' | 'right'
}

export function Chevron(props: ChevronProps): React.ReactElement {
  const { direction } = props

  return (
    <svg
      sx={{
        height: '1em',
        width: '1em',
        fill: 'currentColor',
      }}
      viewBox="0 0 110 210"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={PATHS[direction]}></path>
    </svg>
  )
}

Chevron.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
}
