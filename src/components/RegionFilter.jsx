import React, { useState } from 'react';

const RegionFilter = () => {
  const regions = ['Region1', 'Region2', 'Region3'];
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <div className="region-filter">
      <div className={`filter-box ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <span>{selectedRegion || 'Filter Selon la region'}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>

      {isOpen && (
        <ul className="region-list">
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => handleSelect(region)}
              className={region === selectedRegion ? 'selected' : ''}
            >
              {region}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .region-filter {
          width: 220px;
          font-family: sans-serif;
          position: relative;
          z-index: 10;
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
          color: #ff8800;
          font-weight: bold;
          transition: border-radius 0.3s ease;
        }

        .filter-box.open {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .arrow {
          margin-left: 8px;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .arrow.up {
          transform: rotate(180deg);
        }

        .region-list {
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

        .region-list li {
          padding: 10px 14px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .region-list li:hover,
        .region-list li.selected {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default RegionFilter;
