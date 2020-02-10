// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { DateRow } from './DateRow'
import mdx from './DateRow.mdx'

export default {
  title: 'Core/Date Row',
  component: DateRow,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <DateRow
      interval={{
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 5),
      }}
      minHeight={100}
      renderDate={(date: Date): React.ReactElement => (
        <div
          css={{
            border: '1px solid black',
            padding: '1em',
          }}
        >
          {date.toString()}
        </div>
      )}
    />
  )
}
