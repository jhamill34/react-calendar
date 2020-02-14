/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Chevron } from './Chevron'
import mdx from './Chevron.mdx'

export default {
  title: 'Themed/Components/Chevron',
  component: Chevron,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
