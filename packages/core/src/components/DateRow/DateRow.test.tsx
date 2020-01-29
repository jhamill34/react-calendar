import React from 'react'
import { render } from '@testing-library/react'
import { matchers } from 'jest-emotion'
expect.extend(matchers)

import { format } from 'date-fns'

import { DateRow } from './DateRow'

/** */
function mockRenderDate(d: Date): React.ReactElement {
  return <div data-testid="test-date">{format(d, 'd')}</div>
}

describe('<DateRow />', () => {
  it('should render flexDirection row by default', () => {
    const mockInterval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { container } = render(
      <DateRow
        interval={mockInterval}
        minHeight={100}
        renderDate={mockRenderDate}
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'row')
  })

  it('should render flexDirection column when set', () => {
    const mockInterval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { container } = render(
      <DateRow
        interval={mockInterval}
        minHeight={100}
        renderDate={mockRenderDate}
        vertical
      />
    )

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')
  })

  it('should set a min height', () => {
    const mockInterval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { container } = render(
      <DateRow
        interval={mockInterval}
        minHeight={100}
        renderDate={mockRenderDate}
      />
    )

    expect(container.firstChild).toHaveStyleRule('min-height', '100px')
  })

  it('renders as many children as there are dates in the interval', () => {
    const mockInterval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { queryAllByTestId } = render(
      <DateRow interval={mockInterval} renderDate={mockRenderDate} />
    )

    expect(queryAllByTestId('test-date')).toHaveLength(3)
  })

  it('should be a flex container', () => {
    const mockInterval: Interval = {
      start: new Date(2019, 11, 1),
      end: new Date(2019, 11, 4),
    }

    const { container } = render(
      <DateRow interval={mockInterval} renderDate={mockRenderDate} />
    )

    expect(container.firstChild).toHaveStyleRule('display', 'flex')
  })
})
