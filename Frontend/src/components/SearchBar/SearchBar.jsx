import React, { useState, useCallback, useContext, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { FiltersContext } from '../../context/FiltersContext';
import { useLocation } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState(filters.searchQuery || []);
  const inputRef = useRef(null);
  const location = useLocation();
  
  const performSearch = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get('/api/property/autocomplete', {
          params: { query },
        });
        setAutocompleteSuggestions(response.data);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const debouncedSearch = useCallback(debounce((query) => {
    performSearch(query);
  }, 500), []);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSuggestionSelect = (suggestion) => {
    if (!selectedItems.includes(suggestion.value)) {
      const newSelection = [...selectedItems, suggestion.value];
      setSelectedItems(newSelection);
      updateFilters({ searchQuery: newSelection }); // 🔥 Actualiza los filtros globales correctamente
      onSubmit({ ...filters, searchQuery: newSelection });
    }
  
    setInputValue(""); // 🔥 Limpia el input después de seleccionar una sugerencia
    setAutocompleteSuggestions([]); // 🔥 Limpia la lista de autocompletado
  
    // 🔥 Fuerza la actualización del input eliminando el foco
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };
  
  

  const handleRemoveItem = (item) => {
    const updatedSelection = selectedItems.filter((i) => i !== item);
    setSelectedItems(updatedSelection);
    updateFilters({ searchQuery: updatedSelection });
    onSubmit({ ...filters, searchQuery: updatedSelection });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <Row>
      <Col>
        <div className="search-bar-wrapper">
          <div className="input-icon-wrapper">
            <FaSearch className="input-icon-placeholder" />
            <div className="selected-items-container">
              {selectedItems.map((item) => (
                <span key={item} className="selected-item" onClick={() => handleRemoveItem(item)}>
                  <p>{item}</p> <FaTimes className='equis'/>
                </span>
              ))}
              <input
                ref={inputRef}
                type="text"
                className="input-with-selected"
                value={inputValue}
                placeholder={selectedItems.length === 0 ? "Buscar dirección, título, barrio, etc..." : ""}
                onChange={handleSearchChange}
                onFocus={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            {autocompleteSuggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                <ul>
                  {autocompleteSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.value}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.value} {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Col>
      {location.pathname !== '/' && (
        <Col md="auto">
          <Button className="search-button search-button-filter" type="submit">
            BUSCAR
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default SearchBar;
