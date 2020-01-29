import { isSameDay } from 'date-fns'
import {
  CalendarEvent,
  CalendarGroup,
  schedule,
  chunkInterval,
  assignEventsToIntervals,
  getOverlappingInterval,
} from '..'

describe('Utility Methods', () => {
  describe('#getOverlappingInterval', () => {
    it('should return the interval if it is completely inside of the parent', () => {
      const mockParent: Interval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 8),
      }

      const mockChild: Interval = {
        start: new Date(2019, 11, 2),
        end: new Date(2019, 11, 3),
      }

      const result = getOverlappingInterval(mockChild, mockParent)

      expect(result).not.toBeNull()
      if (result !== null) {
        expect(isSameDay(new Date(2019, 11, 2), result.start)).toBe(true)
        expect(isSameDay(new Date(2019, 11, 3), result.end)).toBe(true)
      }
    })

    it('should return null if child is not inside of the parent', () => {
      const mockParent: Interval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 8),
      }

      const mockChild: Interval = {
        start: new Date(2019, 10, 2),
        end: new Date(2019, 10, 3),
      }

      const result = getOverlappingInterval(mockChild, mockParent)

      expect(result).toBeNull()
    })

    it('should trim the child interval to the parent bounds if they overlap at the beginning', () => {
      const mockParent: Interval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 8),
      }

      const mockChild: Interval = {
        start: new Date(2019, 10, 20),
        end: new Date(2019, 11, 3),
      }

      const result = getOverlappingInterval(mockChild, mockParent)
      expect(result).not.toBeNull()
      if (result !== null) {
        expect(isSameDay(new Date(2019, 11, 1), result.start)).toBe(true)
        expect(isSameDay(new Date(2019, 11, 3), result.end)).toBe(true)
      }
    })

    it('should trim the child interval to the parent bounds if they overlap at the end', () => {
      const mockParent: Interval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 8),
      }

      const mockChild: Interval = {
        start: new Date(2019, 11, 5),
        end: new Date(2019, 11, 10),
      }

      const result = getOverlappingInterval(mockChild, mockParent)

      expect(result).not.toBeNull()
      if (result !== null) {
        expect(isSameDay(new Date(2019, 11, 5), result.start)).toBe(true)
        expect(isSameDay(new Date(2019, 11, 8), result.end)).toBe(true)
      }
    })

    it('should trim to both parent bounds if the child is larger then the parent', () => {
      const mockParent: Interval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 8),
      }

      const mockChild: Interval = {
        start: new Date(2019, 10, 20),
        end: new Date(2019, 11, 20),
      }

      const result = getOverlappingInterval(mockChild, mockParent)

      expect(result).not.toBeNull()
      if (result !== null) {
        expect(isSameDay(new Date(2019, 11, 1), result.start)).toBe(true)
        expect(isSameDay(new Date(2019, 11, 8), result.end)).toBe(true)
      }
    })
  })

  describe('#assignEventsToIntervals', () => {
    it('should sort events accordingly', () => {
      const mockIntervals: Interval[] = [
        {
          start: new Date(2019, 11, 1),
          end: new Date(2019, 11, 8),
        },
        {
          start: new Date(2019, 11, 8),
          end: new Date(2019, 11, 15),
        },
      ]

      const mockEvents: CalendarEvent[] = [
        {
          id: 1,
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 3),
          },
        },
        {
          id: 2,
          interval: {
            start: new Date(2019, 11, 4),
            end: new Date(2019, 11, 5),
          },
        },
        {
          id: 3,
          interval: {
            start: new Date(2019, 11, 9),
            end: new Date(2019, 11, 10),
          },
        },
      ]

      const result: CalendarGroup[] = assignEventsToIntervals(
        mockEvents,
        mockIntervals
      )

      expect(result).toHaveLength(2)
      expect(result[0].events).toHaveLength(2)
      expect(result[1].events).toHaveLength(1)
    })

    it('should split events spanning multiple intervals', () => {
      const mockIntervals: Interval[] = [
        {
          start: new Date(2019, 11, 1),
          end: new Date(2019, 11, 8),
        },
        {
          start: new Date(2019, 11, 8),
          end: new Date(2019, 11, 15),
        },
      ]

      const mockEvents: CalendarEvent[] = [
        {
          id: 1,
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 3),
          },
        },
        {
          id: 2,
          interval: {
            start: new Date(2019, 11, 4),
            end: new Date(2019, 11, 10),
          },
        },
        {
          id: 3,
          interval: {
            start: new Date(2019, 11, 9),
            end: new Date(2019, 11, 10),
          },
        },
      ]

      const result: CalendarGroup[] = assignEventsToIntervals(
        mockEvents,
        mockIntervals
      )

      expect(result).toHaveLength(2)
      expect(result[0].events).toHaveLength(2)
      expect(result[1].events).toHaveLength(2)

      expect(result[0].events[0].id).toEqual(1)
      expect(result[0].events[1].id).toEqual(2)
      expect(result[1].events[0].id).toEqual(2)
      expect(result[1].events[1].id).toEqual(3)
    })
  })

  describe('#chunkInterval', () => {
    it('should take an un even interval and split accordingly (leaving out extra days)', () => {
      const mockInterval = {
        start: new Date(2019, 11, 1),
        end: new Date(2019, 11, 31),
      }

      const result: Interval[] = chunkInterval(mockInterval, 7)
      expect(result).toHaveLength(4)
    })

    it('should take an interval and split into number of chunks', () => {
      const mockInterval = {
        start: new Date(2019, 11, 1),
        end: new Date(2020, 0, 5),
      }

      const result: Interval[] = chunkInterval(mockInterval, 7)
      expect(result).toHaveLength(5)
    })
  })

  describe('#schedule', () => {
    it('should always place longer events first', () => {
      const mockEvents: CalendarEvent[] = [
        {
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 3),
          },
          id: 2,
        },
        {
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 5),
          },
          id: 1,
        },
        {
          interval: {
            start: new Date(2019, 11, 5),
            end: new Date(2019, 11, 6),
          },
          id: 3,
        },
      ]

      const result = schedule(mockEvents)
      expect(result).toHaveLength(2)
      expect(result[0]).toHaveLength(2)

      const firstEvent = result[0][0].id
      expect(firstEvent).toEqual(1)
    })

    it('should always find the first row that the event would fit in', () => {
      const mockEvents: CalendarEvent[] = [
        {
          interval: {
            start: new Date(2019, 11, 1),
            end: new Date(2019, 11, 3),
          },
          id: 1,
        },
        {
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 4),
          },
          id: 2,
        },
        {
          interval: {
            start: new Date(2019, 11, 3),
            end: new Date(2019, 11, 5),
          },
          id: 3,
        },
      ]

      const result = schedule(mockEvents)

      expect(result).toHaveLength(2)
      expect(result[0]).toHaveLength(2)
      expect(result[1]).toHaveLength(1)
    })

    it('should create a new row if events overlap', () => {
      const mockEvents: CalendarEvent[] = [
        {
          interval: {
            start: new Date(2019, 11, 3),
            end: new Date(2019, 11, 5),
          },
          id: 2,
        },
        {
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 4),
          },
          id: 1,
        },
      ]

      const result = schedule(mockEvents)
      expect(result).toHaveLength(2)

      const firstEvent = result[0][0].id
      expect(firstEvent).toEqual(1)
    })

    it('should schedule non overlapping events by returning one row with two items', () => {
      const mockEvents: CalendarEvent[] = [
        {
          interval: {
            start: new Date(2019, 11, 4),
            end: new Date(2019, 11, 5),
          },
          id: 2,
        },
        {
          interval: {
            start: new Date(2019, 11, 2),
            end: new Date(2019, 11, 3),
          },
          id: 1,
        },
      ]

      const result = schedule(mockEvents)
      expect(result).toHaveLength(1)
      expect(result[0]).toHaveLength(2)

      const firstEvent = result[0][0].id
      expect(firstEvent).toEqual(1)
    })

    it('should return one row with one item for an event that fits in the window', () => {
      const mockEvents: CalendarEvent[] = [
        {
          interval: {
            start: new Date(2019, 11, 1),
            end: new Date(2019, 11, 3),
          },
          id: 1,
        },
      ]

      const result = schedule(mockEvents)
      expect(result).toHaveLength(1)
      expect(result[0]).toHaveLength(1)
    })
  })
})
