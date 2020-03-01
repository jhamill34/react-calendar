import React from 'react'
import PropTypes from 'prop-types'
import {
  format,
  isSameMonth,
  isSameDay,
  startOfWeek,
  addWeeks,
  endOfMonth,
  addMonths,
  getDaysInMonth,
} from 'date-fns'

import {
  Calendar,
  CalendarRow,
  DateRow,
  ScheduleGroup,
  ScheduleRow,
  CalendarEventPropType,
} from '@react-calendar/core'

import { CalendarEvent } from '@react-calendar/utils'

import { CalendarHeader } from '../CalendarHeader'
import { CalendarButton } from '../CalendarButton'
import { Chevron } from '../Chevron'
import { DateCell } from '../DateCell'
import { DateHeader } from '../DateHeader'
import { EventItem } from '../EventItem'
import { StickyBox } from '../StickyBox'
import { WeekdayHeadings } from '../WeekdayHeadings'

export interface SimpleEvent extends CalendarEvent {
  title: string
}

type SimpleCalendarProps = {
  /**
   * A date object that indicates which month to show currently.
   */
  currentMonth: Date

  /**
   * An array of simple events to display.
   *
   * @default []
   */
  events?: SimpleEvent[]

  /**
   * Function is triggered when the right button in the header
   * is selected.
   */
  nextMonth?: () => void

  /**
   * Function is triggered when the left button in the header
   * is selected.
   */
  prevMonth?: () => void

  /**
   * Triggered when a date is selected
   */
  selectDate?: (date: Date) => void

  /**
   * Triggered with an event is selected
   */
  selectEvent?: (event: SimpleEvent) => void

  /**
   * @default false
   */
  vertical?: boolean

  /**
   * The date to indicate as today.
   *
   * @default Date.now()
   */
  today?: Date | number
}

/** */
export function SimpleCalendar(props: SimpleCalendarProps): React.ReactElement {
  const {
    currentMonth,
    today = Date.now(),
    events = [],
    vertical = false,
    selectDate,
    selectEvent,
  } = props

  const wrappedToday = new Date(today)
  let monthInterval: Interval

  if (vertical) {
    monthInterval = {
      start: currentMonth,
      end: addMonths(currentMonth, 1),
    }
  } else {
    monthInterval = {
      start: startOfWeek(currentMonth),
      end: addWeeks(endOfMonth(currentMonth), 1),
    }
  }

  return (
    <Calendar
      events={events}
      groupSize={vertical ? getDaysInMonth(currentMonth) : 7}
      heading={
        <StickyBox>
          <CalendarHeader
            left={
              props.prevMonth ? (
                <CalendarButton
                  label="Left Header Button"
                  onSelect={props.prevMonth}
                >
                  <Chevron direction="left" />
                </CalendarButton>
              ) : (
                <div />
              )
            }
            right={
              props.nextMonth ? (
                <CalendarButton
                  label="Right Header Button"
                  onSelect={props.nextMonth}
                >
                  <Chevron direction="right" />
                </CalendarButton>
              ) : (
                <div />
              )
            }
            title={format(currentMonth, 'MMMM yyyy')}
          />
          {!vertical ? <WeekdayHeadings /> : null}
        </StickyBox>
      }
      interval={monthInterval}
      renderEventGroup={(group): React.ReactElement => (
        <CalendarRow
          bg={
            <DateRow
              interval={group.interval}
              renderDate={(date: Date): React.ReactElement => (
                <DateCell
                  disabled={!isSameMonth(currentMonth, date)}
                  onSelect={(): void => selectDate && selectDate(date)}
                >
                  <DateHeader
                    selected={isSameDay(wrappedToday, date)}
                    value={format(date, 'd')}
                  />
                </DateCell>
              )}
              vertical={vertical}
            />
          }
          fg={
            <ScheduleGroup
              events={group.events}
              leadingSpace={3}
              numEventRows={2}
              renderGroup={(events): React.ReactElement => (
                <ScheduleRow
                  events={events}
                  interval={group.interval}
                  renderEvent={(event): React.ReactElement => (
                    <EventItem
                      onSelect={(): void => selectEvent && selectEvent(event)}
                      title={event.title}
                    />
                  )}
                  vertical={vertical}
                />
              )}
              vertical={vertical}
            />
          }
        />
      )}
    />
  )
}

SimpleCalendar.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      ...CalendarEventPropType,
    }).isRequired
  ),
  nextMonth: PropTypes.func,
  prevMonth: PropTypes.func,
  today: PropTypes.instanceOf(Date),
}
