import { CalendarTheme } from './models'
import { calendarTheme } from './basic'

export const theme: CalendarTheme = {
  calendar: {
    ...calendarTheme,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Open Sans, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    background: '#FFFFFF',
    muted: '#CCCCCC',
    primary: '#D32F2F',
    text: '#505050',
    modes: {
      dark: {
        background: '#121212',
        primary: '#E57373',
        muted: '#303030',
        text: '#EEEEEE',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
}
