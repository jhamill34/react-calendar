import React from 'react'
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { Chevron } from '../Chevron'
import { CalendarButton } from '../CalendarButton'
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
  decorators: [withThemeProvider],
}

export function basicUsage(): JSX.Element {
  return (
    <CalendarHeader
      left={
        <CalendarButton onSelect={(): void => alert('Left Clicked!')}>
          <Chevron direction="left" />
        </CalendarButton>
      }
      right={
        <CalendarButton onSelect={(): void => alert('Right Clicked!')}>
          <Chevron direction="right" />
        </CalendarButton>
      }
      title="Calendar Heading"
    />
  )
}
