# React Calendar Core

Checkout the documentation for this library at [React Calendar](https://reactcalendar.netlify.com)

# Getting Started 

Typically this library is only going to be used if you want full customization of your calendar from 
using custom components to conditional rendering. The main purpose of the core library is to 
schedule where events should go in relation to a surrounding interval. `@react-calendar/themed` heavily uses 
this library in conjunction to [Theme UI](https://theme-ui.com)

## Installing 

### NPM 

```bash 
npm install --save @react-calendar/core @emotion/core react react-dom
```

### Yarn

```bash
yarn add @react-calendar/core @emotion/core react react-dom
```

## Optional (But helpful)

While it's not required to use this library but [date-fns](https://date-fns.org/) 
is really useful in conjunction with this one. 

```bash
yarn add date-fns @emotion/core
```

## Calendar Events 

All calendar events must have the an `id`, and `interval` key in them. When using TypeScript, to ensure this
its as simple as extending the CalendarEvent interface and relying on this libraries generic implementations.

Intervals are just objects with a `start` and an `end` key each of which reference a `Date` object. Typically in this
library intervals are used like the `slice` method would be used, where the start value is inclusive and the end value 
is exclusive. 

## Example 

```tsx dark
/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import {
  Calendar,
  CalendarRow,
  DateRow,
  ScheduleGroup,
  ScheduleRow,
  CalendarEvent,
} from '@react-calendar/core'

interface MyEvent extends CalendarEvent {
  title: string
}

type Props = {
  events: MyEvent[]
}

/**
 * An example using all of the components together to create a basic calendar
 */
export function MyCalendar(props: Props): React.ReactElement {
  const monthInterval: Interval = {
    start: new Date(2019, 11, 1),
    end: new Date(2019, 11, 22),
  }

  return (
    <Calendar
      events={props.events}
      heading={<div>December 2019</div>}
      interval={monthInterval}
      renderEventGroup={(group): React.ReactElement => (
        <CalendarRow
          bg={
            <DateRow
              interval={group.interval}
              minHeight={150}
              renderDate={(date: Date): React.ReactElement => (
                <div css={{ border: '1px solid black' }}>{date.getDate()}</div>
              )}
            />
          }
          fg={
            <ScheduleGroup
              events={group.events}
              leadingSpace={2}
              numEventRows={3}
              renderGroup={(events): React.ReactElement => (
                <ScheduleRow
                  events={events}
                  interval={group.interval}
                  renderEvent={(event): React.ReactElement => (
                    <div css={{ backgroundColor: 'hotpink' }}>
                      {event.title}
                    </div>
                  )}
                />
              )}
            />
          }
        />
      )}
    />
  )
}
```