/** @jsx jsx */
import { jsx } from '@emotion/core'
import { SimpleCalendar } from './SimpleCalendar'
import mdx from './SimpleCalendar.mdx'

export default {
  title: 'Themed/Components/Simple Calendar',
  component: SimpleCalendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
