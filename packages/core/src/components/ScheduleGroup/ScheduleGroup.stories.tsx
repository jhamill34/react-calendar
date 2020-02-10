// eslint-disable-next-line tsdoc/syntax
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { ScheduleGroup } from './ScheduleGroup'
import mdx from './ScheduleGroup.mdx'

export default {
  title: 'Core/Schedule Group',
  component: ScheduleGroup,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <ScheduleGroup
      events={[
        {
          id: 0,
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 4),
          },
        },
        {
          id: 1,
          interval: {
            start: new Date(2019, 11, 3),
            end: new Date(2019, 11, 5),
          },
        },
        {
          id: 2,
          interval: {
            start: new Date(2019, 11, 4),
            end: new Date(2019, 11, 6),
          },
        },
      ]}
      renderGroup={(events): React.ReactElement => (
        <div
          css={{
            border: '1px solid black',
            padding: '1em',
          }}
        >
          Scheduled Events: [{events.map(e => `Event ID: ${e.id}`).join(', ')}]
        </div>
      )}
    />
  )
}
