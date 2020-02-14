/** @jsx jsx */
import { jsx } from '@emotion/core'
import { EventItem } from './EventItem'
import mdx from './EventItem.mdx'

export default {
  title: 'Themed/Components/Event Item',
  component: EventItem,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function basicUsage(): JSX.Element {
  return <EventItem title="Events" />
}
