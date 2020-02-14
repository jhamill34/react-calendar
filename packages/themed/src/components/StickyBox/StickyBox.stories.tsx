/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StickyBox } from './StickyBox'
import mdx from './StickyBox.mdx'

export default {
  title: 'Themed/Components/Sticky Box',
  component: StickyBox,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <div></div>
}
