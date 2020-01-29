// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type EventItemProps = {
  /** */
  hidden?: boolean

  /** */
  onSelect?: () => void

  /** */
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
        pointerEvents: 'auto',
        visibility: hidden ? 'hidden' : 'visible',
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
