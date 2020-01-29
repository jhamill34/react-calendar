import React from 'react'
import PropTypes from 'prop-types'
import {
  format,
  isSameMonth,
  isSameDay,
  startOfWeek,
  addWeeks,
  endOfMonth,
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
import { CalendarHeaderBtn } from '../CalendarHeaderBtn'
import { Chevron } from '../Chevron'
import { DateCell } from '../DateCell'
import { DateHeader } from '../DateHeader'
import { EventItem } from '../EventItem'
import { StickyBox } from '../StickyBox'
import { WeekdayHeadings } from '../WeekdayHeadings'

export interface SimpleEvent extends CalendarEvent {
  /** */
  title: string
}

type SimpleCalendarProps = {
  /** */
  currentMonth: Date

  /** */
  events?: SimpleEvent[]

  /** */
  nextMonth?: () => void

  /** */
  prevMonth?: () => void

  /** */
  today?: Date
}

/** */
export function SimpleCalendar(props: SimpleCalendarProps): React.ReactElement {
  const { currentMonth, today, events = [] } = props

  const monthInterval: Interval = {
    start: startOfWeek(currentMonth),
    end: addWeeks(endOfMonth(currentMonth), 1),
  }

  return (
    <Calendar
      events={events}
      groupSize={7}
      heading={
        <StickyBox>
          <CalendarHeader
            left={
              props.prevMonth ? (
                <CalendarHeaderBtn
                  label="Left Header Button"
                  onSelect={props.prevMonth}
                >
                  <Chevron direction="left" />
                </CalendarHeaderBtn>
              ) : (
                <div />
              )
            }
            right={
              props.nextMonth ? (
                <CalendarHeaderBtn
                  label="Right Header Button"
                  onSelect={props.nextMonth}
                >
                  <Chevron direction="right" />
                </CalendarHeaderBtn>
              ) : (
                <div />
              )
            }
            title={format(currentMonth, 'MMMM yyyy')}
          />
          <WeekdayHeadings />
        </StickyBox>
      }
      interval={monthInterval}
      renderEventGroup={(group): React.ReactElement => (
        <CalendarRow
          bg={
            <DateRow
              interval={group.interval}
              minHeight={250}
              renderDate={(date: Date): React.ReactElement => (
                <DateCell disabled={!isSameMonth(currentMonth, date)}>
                  <DateHeader
                    selected={today && isSameDay(today, date)}
                    value={format(date, 'd')}
                  />
                </DateCell>
              )}
            />
          }
          fg={
            <ScheduleGroup
              events={group.events}
              renderGroup={(events): React.ReactElement => (
                <ScheduleRow
                  events={events}
                  interval={group.interval}
                  renderEvent={(event): React.ReactElement => (
                    <EventItem title={event.title} />
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
