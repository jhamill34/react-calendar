import { CalendarTheme } from './models'

const dateCell = {
  p: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 0.3s ease-in-out',
  ':hover,:focus': {
    backgroundColor: 'primary',
  },
}

const dateHeader = {
  fontWeight: 'bold',
  p: 2,
  borderRadius: '100%',
}

export const material: CalendarTheme = {
  colors: {
    text: '#3E4C59',
    muted: '#6dc397',
    primary: '#64FFDA',
    background: '#FFFFFF',
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
      backgroundColor: 'primary',
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
        backgroundColor: 'muted',
      },
      disabled: {
        ...dateCell,
        backgroundColor: 'text',
        color: 'background',
        ':hover,:focus': {},
      },
    },
    dateHeader: {
      base: {
        ...dateHeader,
      },
      selected: {
        ...dateHeader,
        backgroundColor: 'primary',
      },
    },
    eventItem: {
      p: 2,
      m: 1,
      backgroundColor: 'primary',
      fontWeight: 'bold',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.2s ease-in-out',
      ':focus,:hover': {
        transform: 'scale(1.05) translateY(-4px)',
        boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
      },
    },
    weekDayHeading: {
      textAlign: 'center',
      backgroundColor: 'primary',
      fontWeight: 'bold',
      p: 2,
    },
  },
}
