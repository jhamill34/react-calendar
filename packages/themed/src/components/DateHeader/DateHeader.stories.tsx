/** @jsx jsx */
import { jsx } from '@emotion/core'
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
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
