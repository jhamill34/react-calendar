import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { CalendarButton } from './CalendarButton'

describe('<CalendarButton />', () => {
  it('should render children', () => {
    const { container } = render(<CalendarButton>Button</CalendarButton>)

    expect(container).toHaveTextContent('Button')
  })

  it('should call trigger callback on click', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <CalendarButton onSelect={mockHandler}>Button</CalendarButton>
    )

    const element = getByText('Button')
    fireEvent.click(element)

    expect(mockHandler).toHaveBeenCalled()
  })

  it('should call trigger callback on keydown ENTER', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <CalendarButton onSelect={mockHandler}>Button</CalendarButton>
    )

    const element = getByText('Button')
    fireEvent.keyDown(element, { keyCode: 13 })
    fireEvent.keyDown(element, { keyCode: 64 })

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  it('should not call select handler if one is not present on click', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(<CalendarButton>Button</CalendarButton>)

    const element = getByText('Button')
    fireEvent.click(element)

    expect(mockHandler).toHaveBeenCalledTimes(0)
  })

  it('should render theme styles', () => {
    const { container } = render(<CalendarButton>Button</CalendarButton>)

    expect(container.firstChild).toHaveStyleRule('background-color', 'red')
    expect(container.firstChild).toHaveStyleRule('color', 'white')
  })
})
