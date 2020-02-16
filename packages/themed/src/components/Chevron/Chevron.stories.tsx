import React from 'react'
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

export function withDirectionLeft(): JSX.Element {
  return <Chevron direction="left" />
}

export function withDirectionRight(): JSX.Element {
  return <Chevron direction="right" />
}
