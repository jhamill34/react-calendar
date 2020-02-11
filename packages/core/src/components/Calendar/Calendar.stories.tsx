/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { format } from 'date-fns'
import { Calendar } from './Calendar'
import mdx from './Calendar.mdx'

export default {
  title: 'Core/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <Calendar
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
        {
          id: 3,
          interval: {
            start: new Date(2019, 11, 7),
            end: new Date(2019, 11, 10),
          },
        },
        {
          id: 4,
          interval: {
            start: new Date(2019, 11, 11),
            end: new Date(2019, 11, 12),
          },
        },
      ]}
      groupSize={7}
      heading={
        <div css={{ fontSize: '1.5em', fontWeight: 'bold' }}>
          This is My Super Cool Heading{' '}
          <span aria-label="Sunglasses emoji" role="img">
            😎
          </span>
        </div>
      }
      interval={{
        start: new Date(2019, 11, 1),
        end: new Date(2020, 0, 5),
      }}
      renderEventGroup={(group): React.ReactElement => (
        <div
          css={{
            border: '1px solid black',
            padding: '1em',
          }}
        >
          <div>
            Week: {format(group.interval.start, 'MMM do')} -{' '}
            {format(group.interval.end, 'MMM do')}
          </div>
          <div>Event Ids: [{group.events.map(e => `#${e.id}`).join(', ')}]</div>
        </div>
      )}
    />
  )
}
