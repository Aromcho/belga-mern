import React from 'react';
import CustomSelect from 'react-select';
import './Select.css';

const Select = ({ value, onChange, isSearchable = true, hideSelectedOptions = false, className, options, isMulti = false, styles, placeholder, fixes = false }) => {
  return (
    <div className={`select-wrapper ${className}`}>
      <CustomSelect 
        value={value}
        isSearchable={isSearchable}
        hideSelectedOptions={hideSelectedOptions}
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
        onChange={onChange}
        noOptionsMessage={() => "No hay opciones"}
        styles={{
          indicatorsContainer: (provided, state) => ({
            display: 'none'
          }),
          menu: (provided, state) => ({
            ...provided,
            zIndex: 99999
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: '#000',
            fontSize: 14,
            fontWeight: className?.includes('contact-form') ? 400 : 300,
            lineHeight: 20
          }),
          placeholder: (provided, state) => ({
            ...provided,
            margin: '0 2px',
            color: '#000',
            fontSize: 14,
            fontWeight: className?.includes('contact-form') ? 400 : 300,
          }),
          valueContainer: (provided, state) => ({
            ...provided,
            padding: 0,
            height: 40,
            "@media only screen and (max-width: 992px)": {
              height: 38,
              bottom: fixes ? 5 : "auto",
              right: fixes ? 3 : "auto"
            },
          }),
          control: (provided, state) => ({
            ...provided,
            borderRadius: className?.includes('contact-form') ? '6px 6px 0 6px' : 0,
            padding: '0 25px',
            borderColor: className?.includes('contact-form') ? '#000' : '#fff',
            backgroundColor: '#fff',
            minHeight: "40px",
            height: "40px",
            "&:hover": {
              borderColor: className?.includes('contact-form') ? '#000' : '#fff',
              boxShadow: className?.includes('contact-form') ? '' : '0 0 0 1px'
            },
            "&:focus": {
              borderColor: className?.includes('contact-form') ? '#000' : '#fff',
              boxShadow: className?.includes('contact-form') ? '' : '0 0 0 1px'
            },
            "@media only screen and (max-width: 992px)": {
              minHeight: "38px",
              height: "38px",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            color: '#000',
            fontSize: 16,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#FFF"
            },
            "&:active": {
              backgroundColor: "#FFF"
            }
          }),
          ...styles
        }}
      />
    </div>
  );
};

export default Select;
