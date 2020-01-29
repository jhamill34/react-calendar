import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { WeekdayHeadings } from './WeekdayHeadings'

describe('<WeekdayHeadings />', () => {
  it('should render the seven weekday names', () => {
    const { container } = render(<WeekdayHeadings />)

    expect(container.firstChild?.childNodes).toHaveLength(7)
  })

  it('should have sunday as the first day by default', () => {
    const { container } = render(<WeekdayHeadings />)

    expect(container.firstChild?.childNodes[0]).toHaveTextContent('Sunday')
    expect(container.firstChild?.childNodes[1]).toHaveTextContent('Monday')
  })

  it('should have sunday as the first day by default', () => {
    const { container } = render(<WeekdayHeadings weekStartsOn={2} />)

    expect(container.firstChild?.childNodes[0]).toHaveTextContent('Tuesday')
    expect(container.firstChild?.childNodes[1]).toHaveTextContent('Wednesday')
  })

  it('should have short names', () => {
    const { container } = render(<WeekdayHeadings short weekStartsOn={2} />)

    expect(container.firstChild?.childNodes[0]).toHaveTextContent('Tue')
    expect(container.firstChild?.childNodes[1]).toHaveTextContent('Wed')
  })

  it('should render theme styles', () => {
    const { getByText } = render(<WeekdayHeadings />)

    const element = getByText('Sunday')
    expect(element).toHaveStyleRule('background-color', 'red')
    expect(element).toHaveStyleRule('font-weight', 'bold')
  })
})
