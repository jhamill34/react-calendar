/** @jsx jsx */
import { jsx } from '@emotion/core'
import { CalendarRow } from './CalendarRow'
import mdx from './CalendarRow.mdx'

export default {
  title: 'Core/Components/Calendar Row',
  component: CalendarRow,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <CalendarRow
      bg={
        <div
          css={{
            height: '100px',
          }}
        >
          I am hidden and dictate the height
        </div>
      }
      fg={
        <div
          css={{
            backgroundColor: '#6dc397',
            padding: '1em',
          }}
        >
          I am in Front and fill to the background!
        </div>
      }
    />
  )
}
