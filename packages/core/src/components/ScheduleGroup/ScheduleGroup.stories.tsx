/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { ScheduleGroup } from './ScheduleGroup'
import mdx from './ScheduleGroup.mdx'

export default {
  title: 'Core/Components/Schedule Group',
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

export function withLeadingSpace(): JSX.Element {
  return (
    <div css={{ backgroundColor: 'silver' }}>
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
        leadingSpace={2}
        renderGroup={(events): React.ReactElement => (
          <div
            css={{
              backgroundColor: 'white',
              border: '1px solid black',
              padding: '1em',
            }}
          >
            Scheduled Events: [{events.map(e => `Event ID: ${e.id}`).join(', ')}
            ]
          </div>
        )}
      />
    </div>
  )
}

export function withExtraRows(): JSX.Element {
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
      numEventRows={3}
      renderGroup={(events): React.ReactElement => (
        <div
          css={{
            backgroundColor: 'white',
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

export function withVerticalOrientation(): JSX.Element {
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
      vertical
    />
  )
}
