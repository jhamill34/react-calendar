import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { CalendarGroup, CalendarEvent } from '@react-calendar/utils'

import { Calendar } from './Calendar'

/** */
function mockRenderGroup(group: CalendarGroup): React.ReactElement {
  return <div data-testid={`calendar-event-group`}>{group.events.length}</div>
}

const mockInterval: Interval = {
  start: new Date(2019, 11, 1),
  end: new Date(2020, 0, 5),
}

const mockEvents: CalendarEvent[] = [
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
]

describe('<Calendar />', () => {
  it('should render a header', () => {
    const { queryByTestId } = render(
      <Calendar
        events={mockEvents}
        groupSize={7}
        heading={<div data-testid="calendar-header">Calendar heading</div>}
        interval={mockInterval}
        renderEventGroup={mockRenderGroup}
      />
    )

    const element = queryByTestId('calendar-header')
    expect(element).toHaveTextContent('Calendar heading')
  })

  it('should render each group', () => {
    const { queryAllByTestId } = render(
      <Calendar
        events={mockEvents}
        groupSize={7}
        heading={<div />}
        interval={mockInterval}
        renderEventGroup={mockRenderGroup}
      />
    )

    expect(queryAllByTestId('calendar-event-group')).toHaveLength(5)
  })

  it('should sort events into each interval', () => {
    const { getAllByTestId } = render(
      <Calendar
        events={mockEvents}
        groupSize={7}
        heading={<div />}
        interval={mockInterval}
        renderEventGroup={mockRenderGroup}
      />
    )

    // mockRenderGroup renders the number of children as text
    const groups = getAllByTestId('calendar-event-group')
    expect(groups[0]).toHaveTextContent('4')
    expect(groups[1]).toHaveTextContent('2')
    expect(groups[2]).toHaveTextContent('0')
    expect(groups[3]).toHaveTextContent('0')
    expect(groups[4]).toHaveTextContent('0')
  })
})
