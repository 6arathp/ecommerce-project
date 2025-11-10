import React from 'react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, max = 10 }) => {
  return (
    <div className="quantity-selector">
      <button
        className="quantity-btn"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        -
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        className="quantity-btn"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;