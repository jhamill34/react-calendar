/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { WeekdayHeadings, WeekDayValues } from './WeekdayHeadings'

import mdx from './WeekdayHeadings.mdx'

export default {
  title: 'Themed/Components/Weekday Headings',
  component: WeekdayHeadings,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [withThemeProvider],
}

export function basicUsage(): JSX.Element {
  return <WeekdayHeadings />
}

export function withShortHeadings(): JSX.Element {
  return <WeekdayHeadings short />
}

export function withStartDate(): JSX.Element {
  return <WeekdayHeadings weekStartsOn={WeekDayValues.TUE} />
}
