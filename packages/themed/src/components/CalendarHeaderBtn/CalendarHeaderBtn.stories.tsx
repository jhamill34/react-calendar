/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { CalendarHeaderBtn } from './CalendarHeaderBtn'
import mdx from './CalendarHeaderBtn.mdx'

export default {
  title: 'Themed/Components/Calendar Header Button',
  component: CalendarHeaderBtn,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function BasicUsage(): JSX.Element {
  const [show, setShow] = useState(false)

  return (
    <div>
      <CalendarHeaderBtn onSelect={(): void => setShow(s => !s)}>
        Click Me!
      </CalendarHeaderBtn>
      {show ? (
        <div sx={{ marginTop: '1em' }}>Header button was clicked</div>
      ) : null}
    </div>
  )
}
