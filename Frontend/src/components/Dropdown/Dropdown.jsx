import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Dropdown.css';

const DormDropdown = ({ value, onChange, placeholder }) => {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className="dropdown-custom-wrapper">
      <span className="dropdown-label" onClick={() => setOpen(!open)}>
        {value || placeholder} <span className="dropdown-arrow">▾</span>
      </span>
      <DropdownButton
        id="dropdown-basic-button"
        title={value || placeholder}
        className="dropdown-custom"
        variant="light"
      >
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => onChange(option)}
            className="dropdown-item-custom"
          >
            {option}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      
    </div>
  );
};

export default DormDropdown;
