import React from 'react'
import { Styled } from 'theme-ui'
import { CalendarHeader } from './CalendarHeader'
import mdx from './CalendarHeader.mdx'

export default {
  title: 'Themed/Components/Calendar Header',
  component: CalendarHeader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return (
    <Styled.root>
      <CalendarHeader
        left={<div>LEFT!</div>}
        right={<div>RIGHT!</div>}
        title="Calendar Heading"
      />
    </Styled.root>
  )
}
