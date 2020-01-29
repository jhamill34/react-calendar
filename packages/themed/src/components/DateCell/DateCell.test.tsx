import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { DateCell } from './DateCell'

describe('<DateCell />', () => {
  it('renders its children', () => {
    const { queryByText } = render(<DateCell>28</DateCell>)
    expect(queryByText('28')).not.toBeNull()
  })

  it('should render base styles when no properties set', () => {
    const { container } = render(<DateCell>28</DateCell>)

    expect(container.firstChild).toHaveStyleRule('background-color', 'white')
  })

  it('should render disabled styles', () => {
    const { container } = render(<DateCell disabled>28</DateCell>)

    expect(container.firstChild).toHaveStyleRule('background-color', 'gray')
  })

  it('should render disabled styles over selected', () => {
    const { container } = render(
      <DateCell disabled selected>
        28
      </DateCell>
    )

    expect(container.firstChild).toHaveStyleRule('background-color', 'gray')
  })

  it('should render selected styles', () => {
    const { container } = render(<DateCell selected>28</DateCell>)

    expect(container.firstChild).toHaveStyleRule('background-color', 'red')
  })

  it('should call the onSelect function when it is clicked', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(<DateCell onSelect={mockHandler}>28</DateCell>)

    const element = getByText('28')
    fireEvent.click(element)

    expect(mockHandler).toHaveBeenCalled()
  })

  it('should not call the onSelect function when it is clicked and disabled', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <DateCell disabled onSelect={mockHandler}>
        28
      </DateCell>
    )

    const element = getByText('28')
    fireEvent.click(element)

    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('should only call the onSelect function when the ENTER key is pressed', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(<DateCell onSelect={mockHandler}>28</DateCell>)

    const element = getByText('28')
    fireEvent.keyDown(element, {
      keyCode: 64,
    })

    fireEvent.keyDown(element, {
      keyCode: 13,
    })

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  it('should call onPreSelect when it becomes focused', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <DateCell onWillSelect={mockHandler}>28</DateCell>
    )

    const element = getByText('28')
    fireEvent.focus(element)

    expect(mockHandler).toHaveBeenCalled()
  })

  it('should not call onPreSelect when it becomes focused and disabled', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <DateCell disabled onWillSelect={mockHandler}>
        28
      </DateCell>
    )

    const element = getByText('28')
    fireEvent.focus(element)

    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('should call onPreSelect when the mouse enters', () => {
    const mockHandler = jest.fn()
    const { getByText } = render(
      <DateCell onWillSelect={mockHandler}>28</DateCell>
    )

    const element = getByText('28')
    fireEvent.mouseEnter(element)

    expect(mockHandler).toHaveBeenCalled()
  })
})
