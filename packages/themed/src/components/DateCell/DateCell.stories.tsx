/** @jsx jsx */
import { jsx } from 'theme-ui'
import { withThemeProvider } from 'storybook-addon-theme-ui'
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
  decorators: [withThemeProvider],
}

export function basicUsage(): JSX.Element {
  return (
    <div sx={{ display: 'flex' }}>
      <DateCell>
        1<br /> Default styles
      </DateCell>
      <DateCell selected>
        2<br /> Selected styles
      </DateCell>
      <DateCell disabled>
        3<br />
        Disabled styles
      </DateCell>
    </div>
  )
}
