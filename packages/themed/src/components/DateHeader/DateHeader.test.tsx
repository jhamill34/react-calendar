import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { render } from '../test-helper'
import { DateHeader } from './DateHeader'

describe('<DateHeader />', () => {
  it('should display the current date', () => {
    const { container } = render(<DateHeader value="5" />)

    expect(container).toHaveTextContent('5')
  })

  it('should have base styles if unselected', () => {
    const { container } = render(<DateHeader value="5" />)

    expect(container.firstChild).toHaveStyleRule('color', 'black')
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      'transparent'
    )
  })

  it('should set selected styles', () => {
    const { container } = render(<DateHeader selected value="5" />)

    expect(container.firstChild).toHaveStyleRule('color', 'white')
    expect(container.firstChild).toHaveStyleRule('background-color', 'red')
  })
})
