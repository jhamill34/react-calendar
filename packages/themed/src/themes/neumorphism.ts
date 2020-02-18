import { CalendarTheme } from './models'

const dateCell = {
  p: 2,
}

const dateHeader = {
  fontWeight: 'bold',
  p: 2,
}

export const neumorphism: CalendarTheme = {
  colors: {
    background: '#EFEEEE',
    muted: '#CDCCCC',
    primary: '#303d74',
    text: '#505050',
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
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
  calendar: {
    header: {
      fontSize: 5,
      fontWeight: 'heading',
      fontFamily: 'heading',
      backgroundColor: 'text',
      color: 'background',
      p: 2,
    },
    button: {
      backgroundColor: 'inherit',
      color: 'inherit',
      border: 0,
      fontSize: 'inherit',
    },
    dateCell: {
      base: {
        ...dateCell,
      },
      selected: {
        ...dateCell,
      },
      disabled: {
        ...dateCell,
        backgroundColor: 'muted',
      },
    },
    dateHeader: {
      base: {
        ...dateHeader,
      },
      selected: {
        ...dateHeader,
        boxShadow:
          '-6px -6px 16px 0 rgba(255, 255, 255, 0.83), 6px 6px 16px 0 rgba(217, 210, 200, 0.53)',
      },
    },
    eventItem: {
      p: 2,
      m: 2,
      borderRadius: 3,
      fontWeight: 'bold',
      backgroundColor: 'background',
      boxShadow:
        '-6px -6px 16px 0 rgba(255, 255, 255, 0.83), 6px 6px 16px 0 rgba(217, 210, 200, 0.53)',
    },
    weekDayHeading: {
      textAlign: 'center',
      backgroundColor: 'text',
      color: 'background',
      fontWeight: 'bold',
      p: 2,
    },
  },
}
