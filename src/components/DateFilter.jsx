import React, { useState } from 'react';

const DateFilter = ({ selectedDate, onSelect }) => {
  const options = ['Today', 'Last 7 Days', 'Last 30 Days'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="date-filter">
      <div className={`filter-box ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <span className="selected-option">
          {selectedDate || 'Filter Selon la Date'}
        </span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>

      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={option === selectedDate ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .date-filter {
          width: 220px;
          font-family: sans-serif;
          position: relative;
          z-index: 10;
        }

        .filter-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #FFF;
          border: 2px solid #FF8500;
          border-radius: 30px;
          padding: 8px 16px;
          cursor: pointer;
          color: #FF8500;
          font-weight: bold;
          transition: border-radius 0.3s ease;
        }

        .filter-box.open {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .selected-option {
          color: #FF8500;
        }

        .arrow {
          margin-left: 8px;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .arrow.up {
          transform: rotate(180deg);
        }

        .options-list {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #FFF;
          border: 2px solid #FF8500;
          border-top: none;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
          list-style: none;
          margin: 0;
          padding: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .options-list li {
          padding: 10px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .options-list li:hover,
        .options-list li.selected {
          background-color: #f2f2f2;
        }

        .options-list li:last-child {
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
        }
      `}</style>
    </div>
  );
};

export default DateFilter;
