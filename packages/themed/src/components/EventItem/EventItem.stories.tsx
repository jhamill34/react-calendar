/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { CalendarRow } from '@react-calendar/core'
import { withThemeProvider } from 'storybook-addon-theme-ui'
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
  decorators: [withThemeProvider],
}

export function BasicUsage(): JSX.Element {
  const [hidden, setHidden] = useState(false)

  function handleBackgroundClick(): void {
    alert('Clicked background')
  }

  return (
    <div>
      <CalendarRow
        bg={
          <div
            onClick={handleBackgroundClick}
            onKeyDown={handleBackgroundClick}
            role="button"
            sx={{ height: '50px', padding: '1em' }}
            tabIndex={0}
          >
            I am the background...Click me!
          </div>
        }
        fg={
          <EventItem
            hidden={hidden}
            onSelect={(): void => alert('Clicked event')}
            title="Events"
          />
        }
      />
      <button onClick={(): void => setHidden(s => !s)}>
        {hidden ? 'Show' : 'Hide'} Top Event
      </button>
    </div>
  )
}
