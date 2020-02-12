/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { ScheduleRow } from './ScheduleRow'
import mdx from './ScheduleRow.mdx'

export default {
  title: 'Components/Schedule Row',
  component: ScheduleRow,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <ScheduleRow
      events={[
        {
          id: 1,
          interval: { start: new Date(2020, 1, 1), end: new Date(2020, 1, 3) },
        },
        {
          id: 2,
          interval: { start: new Date(2020, 1, 4), end: new Date(2020, 1, 5) },
        },
      ]}
      interval={{ start: new Date(2020, 1, 1), end: new Date(2020, 1, 6) }}
      renderEvent={(event): React.ReactElement => (
        <div
          css={{
            border: '1px solid black',
            padding: '1em',
          }}
        >
          Event ID: {event.id}
        </div>
      )}
    />
  )
}

export function withEmptyElement(): JSX.Element {
  return (
    <ScheduleRow
      emptyElement={
        <div css={{ border: '1px solid black', padding: '1em' }}>EMPTY</div>
      }
      events={[
        {
          id: 1,
          interval: { start: new Date(2020, 1, 1), end: new Date(2020, 1, 3) },
        },
        {
          id: 2,
          interval: { start: new Date(2020, 1, 4), end: new Date(2020, 1, 5) },
        },
      ]}
      interval={{ start: new Date(2020, 1, 1), end: new Date(2020, 1, 6) }}
      renderEvent={(event): React.ReactElement => (
        <div css={{ padding: '1em' }}>Event ID: {event.id}</div>
      )}
    />
  )
}

export function withVerticalOrientation(): JSX.Element {
  return <div></div>
}
