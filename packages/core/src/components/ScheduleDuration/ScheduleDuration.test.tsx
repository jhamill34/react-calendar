import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { ScheduleDuration } from './ScheduleDuration'

describe('<ScheduleDuration />', () => {
  it('should render its children', () => {
    const { container } = render(
      <ScheduleDuration>Event Item</ScheduleDuration>
    )

    expect(container).toHaveTextContent('Event Item')
  })

  it('should have a flex ratio equal to durration', () => {
    const { container } = render(<ScheduleDuration />)

    expect(container.firstChild).toHaveStyleRule('flex-grow', '1')
  })

  it('should have a flex ratio equal to durration', () => {
    const { container } = render(<ScheduleDuration durration={2} />)

    expect(container.firstChild).toHaveStyleRule('flex-grow', '2')
  })
})
