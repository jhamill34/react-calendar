// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type CalendarHeaderBtnProps = {
  /** */
  children: React.ReactNode

  /** */
  label?: string

  /** */
  onSelect?: () => void
}

const ENTER_KEY_CODE = 13

/** */
export function CalendarHeaderBtn(
  props: CalendarHeaderBtnProps
): React.ReactElement {
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
        variant: 'calendar.headerBtn',
      }}
    >
      {props.children}
    </button>
  )
}

CalendarHeaderBtn.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  onSelect: PropTypes.func,
}
