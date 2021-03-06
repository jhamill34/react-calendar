/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { addMonths, format } from 'date-fns'
import { SimpleCalendar, SimpleEvent } from './SimpleCalendar'
import mdx from './SimpleCalendar.mdx'

export default {
  title: 'Themed/Ready To Go/Simple Calendar',
  component: SimpleCalendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [withThemeProvider],
}

export function BasicUsage(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date(2020, 3, 1))
  const [label, setLabel] = useState('')

  const events: SimpleEvent[] = [
    {
      id: 1,
      title: 'First Event',
      interval: {
        start: new Date(2020, 3, 2),
        end: new Date(2020, 3, 5),
      },
    },
    {
      id: 2,
      title: 'This event spans two weeks',
      interval: {
        start: new Date(2020, 3, 10),
        end: new Date(2020, 3, 14),
      },
    },
    {
      id: 3,
      title: 'Overlapping Event',
      interval: {
        start: new Date(2020, 3, 13),
        end: new Date(2020, 3, 15),
      },
    },
    {
      id: 4,
      title: 'Other event',
      interval: {
        start: new Date(2020, 3, 14),
        end: new Date(2020, 3, 16),
      },
    },
  ]

  return (
    <div>
      <div>{label}</div>
      <SimpleCalendar
        currentMonth={currentMonth}
        events={events}
        nextMonth={(): void => setCurrentMonth(m => addMonths(m, 1))}
        prevMonth={(): void => setCurrentMonth(m => addMonths(m, -1))}
        selectDate={(date: Date): void =>
          setLabel(`Clicked Date: "${format(date, 'MMM do, yyyy')}"`)
        }
        selectEvent={(event: SimpleEvent): void =>
          setLabel(`Clicked "${event.title}"`)
        }
      />
    </div>
  )
}

export function WithVerticalOrientation(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date(2020, 3, 1))
  const [label, setLabel] = useState('')

  const events: SimpleEvent[] = [
    {
      id: 1,
      title: 'First Event',
      interval: {
        start: new Date(2020, 3, 2),
        end: new Date(2020, 3, 5),
      },
    },
    {
      id: 2,
      title: 'This event spans two weeks',
      interval: {
        start: new Date(2020, 3, 10),
        end: new Date(2020, 3, 14),
      },
    },
    {
      id: 3,
      title: 'Overlapping Event',
      interval: {
        start: new Date(2020, 3, 13),
        end: new Date(2020, 3, 15),
      },
    },
    {
      id: 4,
      title: 'Other event',
      interval: {
        start: new Date(2020, 3, 14),
        end: new Date(2020, 3, 16),
      },
    },
  ]

  return (
    <div
      css={{
        height: 500,
        overflowY: 'scroll',
      }}
    >
      <div>{label}</div>
      <SimpleCalendar
        currentMonth={currentMonth}
        events={events}
        nextMonth={(): void => setCurrentMonth(m => addMonths(m, 1))}
        prevMonth={(): void => setCurrentMonth(m => addMonths(m, -1))}
        selectDate={(date: Date): void =>
          setLabel(`Clicked Date: "${format(date, 'MMM do, yyyy')}"`)
        }
        selectEvent={(event: SimpleEvent): void =>
          setLabel(`Clicked Event: "${event.title}"`)
        }
        vertical
      />
    </div>
  )
}
