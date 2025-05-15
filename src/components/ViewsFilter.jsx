import React, { useState } from 'react';

const ViewsFilter = ({ selectedView, onSelect }) => {
  const views = ['Table View', 'Dashboards View', 'Files View'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (view) => {
    onSelect(view); // Communiquer le choix au parent
    setIsOpen(false);
  };

  return (
    <div className="views-filter">
    <div className={`filter-box ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
      <span className="selected-view">{selectedView}</span>
      <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
    </div>

    {isOpen && (
      <ul className="views-list">
        {views.map((view) => (
          <li
            key={view}
            onClick={() => handleSelect(view)}
            className={view === selectedView ? 'selected' : ''}
          >
            {view}
          </li>
        ))}
      </ul>
    )}

      <style>{`
        .views-filter {
          width: 220px;
          font-family: sans-serif;
          position: relative;
          z-index: 10;
        }
.views-list li:last-child {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

        .filter-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          border: 1px solid black;
          border-radius: 20px;
          padding: 10px 14px;
          cursor: pointer;
          font-weight: bold;
          transition: border-radius 0.3s ease;
        }

        .filter-box.open {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .selected-view {
          color: #ff8800; /* Same as hover highlight */
        }

        .arrow {
          margin-left: 8px;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .arrow.up {
          transform: rotate(180deg);
        }

        .views-list {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: white;
          border: 1px solid black;
          border-top: none;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          list-style: none;
          margin: 0;
          padding: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .views-list li {
          padding: 10px 14px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .views-list li:hover,
        .views-list li.selected {
          background-color: #f2f2f2; /* Same as hover highlight */
        }
      `}</style>
    </div>
  );
};

export default ViewsFilter;
