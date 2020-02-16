import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { CalendarRow } from './CalendarRow'

describe('<CalendarRow />', () => {
  it('should have a first child that is position relative', () => {
    const { container } = render(<CalendarRow />)

    expect(container.firstChild).toHaveStyleRule('position', 'relative')
  })

  describe('background', () => {
    it('has a background component', () => {
      const { queryByTestId } = render(
        <CalendarRow bg={<div data-testid="row-background">Background</div>} />
      )

      expect(queryByTestId('row-background')).toHaveTextContent('Background')
    })

    it('should be placed in the background', () => {
      const { getByTestId } = render(
        <CalendarRow bg={<div data-testid="row-background" />} />
      )

      const bgParent = getByTestId('row-background').parentNode
      expect(bgParent).toHaveStyleRule('position', 'relative')
    })

    it('should be placed in flex container', () => {
      const { getByTestId } = render(
        <CalendarRow bg={<div data-testid="row-background" />} />
      )

      const bgParent = getByTestId('row-background').parentNode
      expect(bgParent).toHaveStyleRule('display', 'flex')
    })
  })

  describe('foreground', () => {
    it('should not recieve any pointer events', () => {
      const { getByTestId } = render(
        <CalendarRow fg={<div data-testid="row-foreground" />} />
      )

      const bgParent = getByTestId('row-foreground').parentNode
      expect(bgParent).toHaveStyleRule('pointer-events', 'none')
    })

    it('has a foreground component', () => {
      const { queryByTestId } = render(
        <CalendarRow fg={<div data-testid="row-foreground">Foreground</div>} />
      )

      expect(queryByTestId('row-foreground')).toHaveTextContent('Foreground')
    })

    it('should be placed in flex container', () => {
      const { getByTestId } = render(
        <CalendarRow fg={<div data-testid="row-foreground" />} />
      )

      const bgParent = getByTestId('row-foreground').parentNode
      expect(bgParent).toHaveStyleRule('display', 'flex')
    })

    it('should be placed in an absolutely positioned element the same size as the parent', () => {
      const { getByTestId } = render(
        <CalendarRow fg={<div data-testid="row-foreground" />} />
      )

      const bgParent = getByTestId('row-foreground').parentNode
      expect(bgParent).toHaveStyleRule('position', 'absolute')
      expect(bgParent).toHaveStyleRule('inset', '0')
    })

    it('should be placed above the background component', () => {
      const { getByTestId } = render(
        <CalendarRow fg={<div data-testid="row-foreground" />} />
      )

      const bgParent = getByTestId('row-foreground').parentNode
      expect(bgParent).toHaveStyleRule('z-index', '1')
    })
  })
})
