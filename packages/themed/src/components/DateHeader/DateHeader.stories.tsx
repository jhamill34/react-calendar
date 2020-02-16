/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { DateHeader } from './DateHeader'
import mdx from './DateHeader.mdx'

export default {
  title: 'Themed/Components/Date Header',
  component: DateHeader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [withThemeProvider],
}

export function basicUsage(): JSX.Element {
  return (
    <div>
      Unselected: <DateHeader value="Feb 15th" />
      <br />
      Selected: <DateHeader selected value="Feb 15th" />
    </div>
  )
}
