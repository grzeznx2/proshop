import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, i) => {
        let iconName =
          value >= i + 1
            ? 'fas fa-star'
            : value < i + 1 && value > i
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        return (
          <span key={i}>
            <i style={{ color }} className={iconName} />
          </span>
        )
      })}
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: 'goldenrod',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
