import { Theme } from 'theme-ui'
import { SystemStyleObject } from '@styled-system/css'

export type CalendarVariants = {
  header: SystemStyleObject
  headerBtn: SystemStyleObject
  dateCell: {
    base: SystemStyleObject
    selected: SystemStyleObject
    disabled: SystemStyleObject
  }
  dateHeader: {
    base: SystemStyleObject
    selected: SystemStyleObject
  }
  eventItem: SystemStyleObject
  weekDayHeading: SystemStyleObject
}

export interface CalendarTheme extends Theme {
  calendar: CalendarVariants
}
