/** @jsx jsx */
import { jsx } from '@emotion/core'
import { WeekdayHeadings } from './WeekdayHeadings'
import mdx from './WeekdayHeadings.mdx'

export default {
  title: 'Themed/Components/Weekday Headings',
  component: WeekdayHeadings,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
