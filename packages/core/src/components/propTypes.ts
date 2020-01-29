import PropTypes from 'prop-types'

export const IntervalPropType = {
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
}

export const CalendarEventPropType = {
  id: PropTypes.number.isRequired,
  interval: PropTypes.shape(IntervalPropType).isRequired,
}
