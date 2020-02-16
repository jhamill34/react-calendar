import React from 'react'
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { CalendarButton } from './CalendarButton'
import page from './CalendarButton.mdx'

export default {
  title: 'Themed/Components/Calendar Button',
  component: CalendarButton,
  parameters: {
    docs: {
      page,
    },
  },
  decorators: [withThemeProvider],
}

export function basicUsage(): JSX.Element {
  return (
    <CalendarButton onSelect={(): void => alert('Clicked!')}>
      Click Me
    </CalendarButton>
  )
}
