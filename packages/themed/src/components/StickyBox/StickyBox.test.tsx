import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { StickyBox } from './StickyBox'

describe('<StickyBox />', () => {
  it('should render children', () => {
    const { container } = render(<StickyBox>Test Stuff</StickyBox>)

    expect(container).toHaveTextContent('Test Stuff')
  })

  it('should have a parent element that makes it sticky', () => {
    const { container } = render(<StickyBox>Test Stuff</StickyBox>)

    expect(container.firstChild).toHaveStyleRule('position', 'sticky')
    expect(container.firstChild).toHaveStyleRule('top', '0')
    expect(container.firstChild).toHaveStyleRule('z-index', '2')
  })
})
