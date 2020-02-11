import React from 'react'
import { render } from '@testing-library/react'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { CalendarEvent } from '@react-calendar/utils'

import { ScheduleRow } from './ScheduleRow'

/** */
function mockRenderEvent(): React.ReactElement {
  return <div data-testid="schedule-event" />
}

describe('<ScheduleRow />', () => {
  it('should set flexDirection to row by default', () => {
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 5),
    }

    const { container } = render(
      <ScheduleRow
        events={[]}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'row')
  })

  it('should set flexDirection to row by default', () => {
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 5),
    }

    const { container } = render(
      <ScheduleRow
        events={[]}
        interval={interval}
        renderEvent={mockRenderEvent}
        vertical
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')
  })

  it('renders with provided component for emtpy spaces', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 5),
    }

    // 2 events and a 1 day gap in the middle
    const events: CalendarEvent[] = [
      {
        id: 0,
        interval: { start: new Date(2019, 11, 1), end: new Date(2019, 11, 2) },
      },
      {
        id: 2,
        interval: { start: new Date(2019, 11, 3), end: new Date(2019, 11, 4) },
      },
    ]

    const { queryAllByTestId } = render(
      <ScheduleRow
        emptyElement={<div data-testid="schedule-empty-event" />}
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(queryAllByTestId('schedule-empty-event')).toHaveLength(2)
  })

  it('should have a parent container that is flexible', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { container } = render(
      <ScheduleRow
        events={[]}
        interval={interval}
        renderEvent={(): React.ReactElement => <div />}
      />
    )

    expect(container.firstChild).toHaveStyleRule('display', 'flex')
  })

  it('renders intervals with render prop', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    // 3 events each with 1 day
    const events: CalendarEvent[] = [
      {
        id: 0,
        interval: { start: new Date(2019, 11, 1), end: new Date(2019, 11, 2) },
      },
      {
        id: 1,
        interval: { start: new Date(2019, 11, 2), end: new Date(2019, 11, 3) },
      },
      {
        id: 2,
        interval: { start: new Date(2019, 11, 3), end: new Date(2019, 11, 4) },
      },
    ]

    const { container, queryAllByTestId } = render(
      <ScheduleRow
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild?.childNodes).toHaveLength(3)
    expect(queryAllByTestId('schedule-event')).toHaveLength(3)
  })

  it('renders intervals proper growth ratios', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 7),
    }

    // 3 events each with 1 day
    const events: CalendarEvent[] = [
      {
        id: 0,
        interval: { start: new Date(2019, 11, 1), end: new Date(2019, 11, 2) },
      },
      {
        id: 2,
        interval: { start: new Date(2019, 11, 4), end: new Date(2019, 11, 7) },
      },
    ]

    const { container } = render(
      <ScheduleRow
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild?.childNodes[0]).toHaveStyleRule(
      'flex-grow',
      '1'
    )
    expect(container.firstChild?.childNodes[1]).toHaveStyleRule(
      'flex-grow',
      '2'
    )
    expect(container.firstChild?.childNodes[2]).toHaveStyleRule(
      'flex-grow',
      '3'
    )
  })

  it('should place spaces between events', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    // 2 events and a 1 day gap in the middle
    const events: CalendarEvent[] = [
      {
        id: 0,
        interval: { start: new Date(2019, 11, 1), end: new Date(2019, 11, 2) },
      },
      {
        id: 2,
        interval: { start: new Date(2019, 11, 3), end: new Date(2019, 11, 4) },
      },
    ]

    const { container, queryAllByTestId } = render(
      <ScheduleRow
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild?.childNodes).toHaveLength(3)
    expect(queryAllByTestId('schedule-event')).toHaveLength(2)
  })

  it('should put space at the beginning of the row', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    // 3 events each with 1 day
    const events: CalendarEvent[] = [
      {
        id: 1,
        interval: { start: new Date(2019, 11, 2), end: new Date(2019, 11, 3) },
      },
      {
        id: 2,
        interval: { start: new Date(2019, 11, 3), end: new Date(2019, 11, 4) },
      },
    ]

    const { container, queryAllByTestId } = render(
      <ScheduleRow
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild?.childNodes).toHaveLength(3)
    expect(queryAllByTestId('schedule-event')).toHaveLength(2)
  })

  it('should put space at the end of the row', () => {
    // 4 days
    const interval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    // 3 events each with 1 day
    const events: CalendarEvent[] = [
      {
        id: 0,
        interval: { start: new Date(2019, 11, 1), end: new Date(2019, 11, 2) },
      },
      {
        id: 1,
        interval: { start: new Date(2019, 11, 2), end: new Date(2019, 11, 3) },
      },
    ]

    const { container, queryAllByTestId } = render(
      <ScheduleRow
        events={events}
        interval={interval}
        renderEvent={mockRenderEvent}
      />
    )

    expect(container.firstChild?.childNodes).toHaveLength(3)
    expect(queryAllByTestId('schedule-event')).toHaveLength(2)
  })
})
