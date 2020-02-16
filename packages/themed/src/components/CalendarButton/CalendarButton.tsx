/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type CalendarButtonProps = {
  /**
   * Any child components that need to be rendered.
   */
  children: ReactNode

  /**
   * Label to apply to button if using an SVG component
   * such as the Chevron for a11y compliance.
   */
  label?: string

  /**
   * When the button is selected by either a keypress or click
   * this callback will be called.
   */
  onSelect?: () => void
}

const ENTER_KEY_CODE = 13

/** */
export function CalendarButton(props: CalendarButtonProps): React.ReactElement {
  /** */
  function handleClick(): void {
    if (props.onSelect) {
      props.onSelect()
    }
  }

  /** */
  function handleKeyPress(e: React.KeyboardEvent): void {
    if (props.onSelect && e.keyCode === ENTER_KEY_CODE) {
      props.onSelect()
    }
  }

  return (
    <button
      aria-label={props.label}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      sx={{
        display: 'inline-flex',
        variant: 'calendar.button',
      }}
    >
      {props.children}
    </button>
  )
}

CalendarButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  onSelect: PropTypes.func,
}
