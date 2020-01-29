import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { CalendarEvent } from '@react-calendar/utils'

import { ScheduleGroup } from './ScheduleGroup'

/** */
function mockRenderGroup(events: CalendarEvent[]): React.ReactElement {
  return <div data-testid="schedule-group">{events.length}</div>
}

describe('<ScheduleGroup />', () => {
  it('should set flexDirection to column by default', () => {
    const { container } = render(
      <ScheduleGroup
        events={[]}
        renderGroup={(): React.ReactElement => <div />}
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')
  })

  it('should set flexDirection to row when set', () => {
    const { container } = render(
      <ScheduleGroup
        events={[]}
        renderGroup={(): React.ReactElement => <div />}
        vertical
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'row')
  })

  it('should create an unflexible element as the first child', () => {
    const { container } = render(
      <ScheduleGroup
        events={[]}
        leadingSpace={1.5}
        renderGroup={(): React.ReactElement => <div />}
      />
    )

    expect(container.firstChild?.firstChild).toHaveStyleRule(
      'flex-basis',
      '1.5em'
    )
    expect(container.firstChild?.firstChild).toHaveStyleRule('flex-grow', '0')
    expect(container.firstChild?.firstChild).toHaveStyleRule('flex-shrink', '0')
    expect(container.firstChild?.firstChild).not.toBeVisible()
  })

  it('should trim rows for a set number of event rows', () => {
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
        id: 0,
        interval: {
          start: new Date(2019, 11, 4),
          end: new Date(2019, 11, 6),
        },
      },
    ]

    const { queryAllByTestId } = render(
      <ScheduleGroup
        events={mockEvents}
        numEventRows={1}
        renderGroup={mockRenderGroup}
      />
    )

    const groups = queryAllByTestId('schedule-group')

    expect(groups).toHaveLength(1)
    expect(groups[0]).toHaveTextContent('2')
  })

  it('should add rows for a set number of event rows', () => {
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
        id: 0,
        interval: {
          start: new Date(2019, 11, 4),
          end: new Date(2019, 11, 6),
        },
      },
    ]

    const { queryAllByTestId } = render(
      <ScheduleGroup
        events={mockEvents}
        numEventRows={3}
        renderGroup={mockRenderGroup}
      />
    )

    const groups = queryAllByTestId('schedule-group')

    expect(groups).toHaveLength(3)
    expect(groups[2]).toHaveTextContent('0')
  })

  it('should have a parent component that is flexable', () => {
    const { container } = render(
      <ScheduleGroup
        events={[]}
        renderGroup={(): React.ReactElement => <div />}
      />
    )

    expect(container.firstChild).toHaveStyleRule('display', 'flex')
  })

  it('should split overlapping events into multiple groups', () => {
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
        id: 0,
        interval: {
          start: new Date(2019, 11, 4),
          end: new Date(2019, 11, 6),
        },
      },
    ]

    const { queryAllByTestId } = render(
      <ScheduleGroup events={mockEvents} renderGroup={mockRenderGroup} />
    )

    const groups = queryAllByTestId('schedule-group')

    expect(groups).toHaveLength(2)
    expect(groups[0]).toHaveTextContent('2')
    expect(groups[1]).toHaveTextContent('1')
  })
})
