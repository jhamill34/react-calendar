export interface CalendarEvent {
  /** */
  id: number

  /** */
  interval: Interval
}

export interface CalendarGroup<T extends CalendarEvent = CalendarEvent> {
  /** */
  events: T[]

  /** */
  interval: Interval
}
