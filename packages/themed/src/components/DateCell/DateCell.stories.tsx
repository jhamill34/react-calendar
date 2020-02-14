/** @jsx jsx */
import { jsx } from '@emotion/core'
import { DateCell } from './DateCell'
import mdx from './DateCell.mdx'

export default {
  title: 'Themed/Components/Date Cell',
  component: DateCell,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
