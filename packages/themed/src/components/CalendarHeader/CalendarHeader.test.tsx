import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { CalendarHeader } from './CalendarHeader'

describe('<CalendarHeader />', () => {
  it('should display the heading title', () => {
    const { container } = render(<CalendarHeader title="December 2019" />)

    expect(container).toHaveTextContent('December 2019')
  })

  it('should set styles set in the theme', () => {
    const { container } = render(<CalendarHeader title="December 2019" />)

    expect(container.firstChild).toHaveStyleRule('background-color', 'red')
    expect(container.firstChild).toHaveStyleRule('color', 'white')
  })

  it('should have a left button', () => {
    const { queryByTestId } = render(
      <CalendarHeader
        left={<div data-testid="left">Left Button</div>}
        title="December"
      />
    )

    expect(queryByTestId('left')).toHaveTextContent('Left Button')
  })

  it('should have a right button', () => {
    const { queryByTestId } = render(
      <CalendarHeader
        right={<div data-testid="right">Right Button</div>}
        title="December"
      />
    )

    expect(queryByTestId('right')).toHaveTextContent('Right Button')
  })
})
