/** @jsx jsx */
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type DateCellProps = {
  /**  Any child components to render */
  children: ReactNode

  /**
   * Indicates that the cell is inactive.
   * When set to true it overrides the selected
   * flag.
   */
  disabled?: boolean

  /**
   * Indicates a cell has been selected. Useful for
   * indicating to the user that they clicked a particular date.
   */
  selected?: boolean

  /**
   * This function is called when the user clicks on the date
   * or has it focused and presses the ENTER key.
   */
  onSelect?: () => void

  /**
   * This function is called when the user focuses on the
   * date or has the mouse hover over it.
   */
  onWillSelect?: () => void
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
