/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

type DateHeaderProps = {
  /**
   * Indicates the date is selected
   * @default false
   */
  selected?: boolean

  /** The value to display */
  value: string
}

/** */
export function DateHeader(props: DateHeaderProps): React.ReactElement {
  const { value, selected = false } = props
  return (
    <div
      sx={{
        alignSelf: 'flex-start',
        display: 'inline-block',
        variant: selected
          ? 'calendar.dateHeader.selected'
          : 'calendar.dateHeader.base',
      }}
    >
      {value}
    </div>
  )
}

DateHeader.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
}
