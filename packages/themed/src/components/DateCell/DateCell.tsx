// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type DateCellProps = {
  /** */
  children: React.ReactNode

  /** */
  disabled?: boolean

  /** */
  onSelect?: () => void

  /** */
  onWillSelect?: () => void

  /** */
  selected?: boolean
}

const ENTER_KEY_CODE = 13

/** */
export function DateCell(props: DateCellProps): React.ReactElement {
  const { disabled = false, selected = false } = props

  /** */
  function handleKeyDown(e: React.KeyboardEvent): void {
    if (!disabled && props.onSelect && e.keyCode === ENTER_KEY_CODE) {
      props.onSelect()
    }
  }

  /** */
  function handleClick(): void {
    if (!disabled && props.onSelect) {
      props.onSelect()
    }
  }

  /** */
  function handleFocus(): void {
    if (!disabled && props.onWillSelect) {
      props.onWillSelect()
    }
  }

  return (
    <div
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleFocus}
      role="gridcell"
      sx={{
        variant: disabled
          ? 'calendar.dateCell.disabled'
          : selected
          ? 'calendar.dateCell.selected'
          : 'calendar.dateCell.base',
      }}
      tabIndex={disabled ? -1 : 0}
    >
      {props.children}
    </div>
  )
}

DateCell.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onWillSelect: PropTypes.func,
  selected: PropTypes.bool,
}
