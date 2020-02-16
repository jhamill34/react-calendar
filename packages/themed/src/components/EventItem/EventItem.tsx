/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type EventItemProps = {
  /**
   * Hide the event component but still allow it to take up space.
   * Events don't get passed to the component in this state.
   *
   * @default false
   */
  hidden?: boolean

  /**
   * This function is called when the user clicks on the date
   * or has it focused and presses the ENTER key.
   */
  onSelect?: () => void

  /**
   * The string that should be displayed in the event.
   */
  title: string
}

const ENTER_KEY_CODE = 13

/** */
export function EventItem(props: EventItemProps): React.ReactElement {
  const { hidden = false } = props

  /** */
  function handleKeyDown(e: React.KeyboardEvent): void {
    if (props.onSelect && e.keyCode === ENTER_KEY_CODE) {
      props.onSelect()
    }
  }

  /** */
  function handleClick(): void {
    if (props.onSelect) {
      props.onSelect()
    }
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      sx={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        variant: 'calendar.eventItem',
      }}
      tabIndex={0}
    >
      {props.title}
    </div>
  )
}

EventItem.propTypes = {
  hidden: PropTypes.bool,
  onSelect: PropTypes.func,
  title: PropTypes.string.isRequired,
}
