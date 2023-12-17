import React, { useState } from 'react';
import {  Star, StarFill } from 'react-bootstrap-icons';
import './index.scss';

export function Rating({ value, onClick }) {
  const [ currentStar, setCurrentStar ] = useState(null);
  const roundedRating = currentStar || Math.round(value);
  const stars = Array(10).fill(false).fill(true, 0, roundedRating);
  const clickable = !!onClick;

  const handleStarClick = index => {
    if (!onClick) return;
    onClick(index);
    setCurrentStar(null);
  };

  return (
    <div className={"rating-container " + (clickable ? 'input' : '')}>
      {stars.map((value, index) => value
        ? <StarFill
          key={'ratingstar-' + index}
          onMouseEnter={() => clickable && setCurrentStar(index + 1)}
          onMouseLeave={() => setCurrentStar(null)}
          onClick={() => handleStarClick(index + 1)}
        />
        : <Star
          key={'ratingstar-' + index}
          onMouseEnter={() => clickable && setCurrentStar(index + 1)}
          onMouseLeave={() => setCurrentStar(null)}
          onClick={() => handleStarClick(index + 1)}
        />)}
      {value ? <span className="ms-1">{value}</span> : null}
    </div>
  );
}

export default Rating;
