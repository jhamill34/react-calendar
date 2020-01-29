import React from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'
import { CalendarTheme } from '../themes/models'

const mockTheme: CalendarTheme = {
  calendar: {
    header: {
      backgroundColor: 'red',
      color: 'white',
    },
    headerBtn: {
      backgroundColor: 'red',
      color: 'white',
    },
    dateCell: {
      base: {
        backgroundColor: 'white',
      },
      selected: {
        backgroundColor: 'red',
      },
      disabled: {
        backgroundColor: 'gray',
      },
    },
    dateHeader: {
      base: {
        backgroundColor: 'transparent',
        color: 'black',
      },
      selected: {
        backgroundColor: 'red',
        color: 'white',
      },
    },
    eventItem: {
      backgroundColor: 'red',
      color: 'white',
    },
    weekDayHeading: {
      backgroundColor: 'red',
      fontWeight: 'bold',
    },
  },
}

/** */
function Wrapper(props: { children?: React.ReactNode }): React.ReactElement {
  return <ThemeProvider theme={mockTheme}>{props.children}</ThemeProvider>
}

/** */
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  return render(ui, { wrapper: Wrapper, ...options })
}

export { customRender as render }
