import { CalendarVariants } from './models'

const dateCell = {
  border: '1px solid #eee',
  p: 2,
  transition: 'all 0.3s ease-in-out',
  outline: 'none',
  ':hover, :focus': {
    borderColor: 'primary',
  },
}

const dateHeader = {
  p: 1,
  borderRadius: 5,
}

export const calendarTheme: CalendarVariants = {
  header: {
    fontFamily: 'heading',
    fontWeight: 'heading',
    lineHeight: 'heading',
    backgroundColor: 'primary',
    color: 'background',
    fontSize: 5,
    p: 2,
    textAlign: 'center',
  },
  headerBtn: {
    border: '1px solid transparent',
    backgroundColor: 'primary',
    color: 'background',
    fontSize: '5',
    outline: 'none',
    ':focus, :hover': {
      borderColor: 'background',
    },
  },
  dateCell: {
    base: {
      ...dateCell,
      backgroundColor: 'background',
    },
    selected: {
      ...dateCell,
      backgroundColor: 'primary',
    },
    disabled: {
      ...dateCell,
      backgroundColor: 'muted',
      ':hover, :focus': {},
    },
  },
  dateHeader: {
    base: {
      ...dateHeader,
      color: 'text',
      backgroundColor: 'transparent',
    },
    selected: {
      ...dateHeader,
      color: 'background',
      backgroundColor: 'primary',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
    },
  },
  eventItem: {
    backgroundColor: 'primary',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    color: 'background',
    m: 1,
    p: 2,
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
    ':hover, :focus': {
      backgroundColor: 'pink',
    },
  },
  weekDayHeading: {
    p: 2,
    fontWeight: 'heading',
    backgroundColor: 'primary',
    color: 'background',
    textAlign: 'center',
  },
}
