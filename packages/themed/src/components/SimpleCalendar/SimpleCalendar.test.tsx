import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { SimpleCalendar, SimpleEvent } from './SimpleCalendar'

// November 16th, 2019
const mockToday: Date = new Date(2019, 10, 16)

const mockMonth: Date = new Date(2019, 10, 1)

const mockEvents: SimpleEvent[] = [
  {
    id: 0,
    interval: { start: new Date(2019, 10, 4), end: new Date(2019, 10, 6) },
    title: 'First Event!',
  },
  {
    id: 1,
    interval: { start: new Date(2019, 10, 5), end: new Date(2019, 10, 7) },
    title: 'Second Event!',
  },
  {
    id: 2,
    interval: { start: new Date(2019, 10, 6), end: new Date(2019, 10, 8) },
    title: 'Third Event!',
  },
  {
    id: 3,
    interval: { start: new Date(2019, 10, 8), end: new Date(2019, 10, 12) },
    title: 'Fourth Event!',
  },
]

describe('<SimpleCalendar />', () => {
  it('should render with the current month', () => {
    const { container } = render(<SimpleCalendar currentMonth={mockMonth} />)

    expect(container).toHaveTextContent('November 2019')
  })

  it('should render with 35 dates', () => {
    const { getAllByText } = render(<SimpleCalendar currentMonth={mockMonth} />)

    const elements = getAllByText(/^\d+$/)

    expect(elements).toHaveLength(35)
  })

  it('should render five seven day weeks', () => {
    const { container } = render(<SimpleCalendar currentMonth={mockMonth} />)

    const rows = container.querySelectorAll(
      '[role="grid"] [role="rowgroup"] [role="row"]'
    )

    expect(rows).toHaveLength(5)
    expect(rows[0].childNodes).toHaveLength(7)
  })

  it('should have dates outside of the month disabled', () => {
    const { getAllByText } = render(<SimpleCalendar currentMonth={mockMonth} />)

    const doubleDates = getAllByText('30')
    expect(doubleDates[0].parentElement).toHaveStyleRule(
      'background-color',
      'gray'
    )
    expect(doubleDates[1].parentElement).toHaveStyleRule(
      'background-color',
      'white'
    )
  })

  it('should have today selected', () => {
    const { getByText } = render(
      <SimpleCalendar currentMonth={mockMonth} today={mockToday} />
    )

    const today = getByText('16')
    const tomorrow = getByText('17')
    expect(today).toHaveStyleRule('background-color', 'red')
    expect(tomorrow).toHaveStyleRule('background-color', 'transparent')
  })

  it('should render week day names', () => {
    const { queryByText } = render(<SimpleCalendar currentMonth={mockMonth} />)

    expect(queryByText('Sunday')).not.toBeNull()
    expect(queryByText('Monday')).not.toBeNull()
  })

  it('should call the next month method when header button is clicked', () => {
    const mockCallback = jest.fn()
    const { getByLabelText } = render(
      <SimpleCalendar currentMonth={mockMonth} nextMonth={mockCallback} />
    )

    const rightButton = getByLabelText('Right Header Button')

    fireEvent.click(rightButton)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('should call the previous month method when header button is clicked', () => {
    const mockCallback = jest.fn()
    const { getByLabelText } = render(
      <SimpleCalendar currentMonth={mockMonth} prevMonth={mockCallback} />
    )

    const leftButton = getByLabelText('Left Header Button')

    fireEvent.click(leftButton)
    expect(mockCallback).toHaveBeenCalled()
  })

  it('should render events', () => {
    const { queryByText } = render(
      <SimpleCalendar currentMonth={mockMonth} events={mockEvents} />
    )

    expect(queryByText('First Event!')).not.toBeNull()
    expect(queryByText('Second Event!')).not.toBeNull()
    expect(queryByText('Third Event!')).not.toBeNull()
  })

  it('should duplicate events that span two weeks', () => {
    const { queryAllByText } = render(
      <SimpleCalendar currentMonth={mockMonth} events={mockEvents} />
    )

    expect(queryAllByText('Fourth Event!')).toHaveLength(2)
  })

  it('click date', () => {
    const mockCallback = jest.fn()
    const { getByText } = render(
      <SimpleCalendar currentMonth={mockMonth} selectDate={mockCallback} />
    )

    const date = getByText('16')
    fireEvent.click(date)

    expect(mockCallback).toHaveBeenCalledWith(new Date(2019, 10, 16))
  })

  it('click event', () => {
    const mockCallback = jest.fn()
    const { getByText } = render(
      <SimpleCalendar
        currentMonth={mockMonth}
        events={mockEvents}
        selectEvent={mockCallback}
      />
    )

    const event = getByText('First Event!')
    fireEvent.click(event)

    expect(mockCallback).toHaveBeenCalledWith(mockEvents[0])
  })

  describe('vertical orientation', () => {
    it('should only show this month', () => {
      const { getAllByText } = render(
        <SimpleCalendar currentMonth={mockMonth} vertical />
      )

      const elements = getAllByText(/^\d+$/)

      expect(elements).toHaveLength(30)
    })
  })
})
