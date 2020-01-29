import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { EventItem } from './EventItem'

describe('<EventItem />', () => {
  it('should be hidden if the prop is set', () => {
    const { getByText } = render(<EventItem hidden title="event" />)

    const element = getByText('event')

    expect(element).not.toBeVisible()
  })

  it('should call onSelect when it is clicked', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(<EventItem title="event" />)

    const element = getByText('event')
    fireEvent.click(element)

    expect(mockHandler).toHaveBeenCalledTimes(0)
  })

  it('should call onSelect when it is clicked', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <EventItem onSelect={mockHandler} title="event" />
    )

    const element = getByText('event')
    fireEvent.click(element)

    expect(mockHandler).toHaveBeenCalled()
  })

  it('should call onSelect when it is clicked', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <EventItem onSelect={mockHandler} title="event" />
    )

    const element = getByText('event')
    fireEvent.keyDown(element, {
      keyCode: 64,
    })

    fireEvent.keyDown(element, {
      keyCode: 13,
    })

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  it('should render the title', () => {
    const { container } = render(<EventItem title="Test Event" />)

    expect(container).toHaveTextContent('Test Event')
  })

  it('should set styles from the theme', () => {
    const { container } = render(<EventItem title="Test Event" />)

    expect(container.firstChild).toHaveStyleRule('background-color', 'red')
    expect(container.firstChild).toHaveStyleRule('color', 'white')
  })
})
