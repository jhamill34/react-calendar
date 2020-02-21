# React Calendar Themed 

Checkout the documentation for this library at [React Calendar](https://joshrasmussen.gitlab.io/react-calendar)

# Getting Started

This library provides many useful components that integrate the [Theme UI](https://theme-ui.com) library and 
the `@react-calendar/core` library together. The main thing this library provides is components that can be easily 
dropped into the core library but also have [theme-ui variants](https://theme-ui.com/guides/variants) to make it
easy to style your calendar in a way that is consistent to your site or app's overal theme.

## Installing 

### NPM 

```bash 
npm install --save @react-calendar/themed theme-ui react react-dom
```

### Yarn

```bash
yarn add @react-calendar/themed theme-ui react react-dom
```

## Optional (But helpful)

While it's not required to use this library but [date-fns](https://date-fns.org/) 
is really useful in conjunction with this one. 

```bash
yarn add date-fns 
```

## Example 

```tsx dark 
import React, { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import { addMonths } from 'date-fns'
import { 
  SimpleEvent, 
  SimpleCalendar,
  base as myTheme
} from '@react-calendar/themed'

export function MyCalendar(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date(2020, 3, 1))

  const events: SimpleEvent[] = [
    {
      id: 1,
      title: 'First Event',
      interval: {
        start: new Date(2020, 3, 2),
        end: new Date(2020, 3, 5),
      },
    },
    {
      id: 2,
      title: 'This event spans two weeks',
      interval: {
        start: new Date(2020, 3, 10),
        end: new Date(2020, 3, 14),
      },
    },
    {
      id: 3,
      title: 'Overlapping Event',
      interval: {
        start: new Date(2020, 3, 13),
        end: new Date(2020, 3, 15),
      },
    },
    {
      id: 4,
      title: 'Other event',
      interval: {
        start: new Date(2020, 3, 14),
        end: new Date(2020, 3, 16),
      },
    },
  ]

  return (
    <ThemeProvider theme={myTheme}>
      <SimpleCalendar
        currentMonth={currentMonth}
        events={events}
        nextMonth={(): void => setCurrentMonth(m => addMonths(m, 1))}
        prevMonth={(): void => setCurrentMonth(m => addMonths(m, -1))}
      />
    </ThemeProvider>
  )
}
```