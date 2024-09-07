import React from 'react';
import Dropdown from "../Dropdown/Dropdown.jsx";
import { Input } from "../Input/Input.jsx";
import { MultiRange } from "../MultiRange/MultiRange.jsx";
import Button from "../Button/Button.jsx";
import Select from "../Select/Select.jsx";
import { formatToMoney, getDropdownValue } from "../../helpers/index.js";
import "./SearchHomeForm.css";

const SearchHomeForm = ({ formData, setFormData, localidades, close, setClose, handleSubmit }) => {
  
  return (
    <div className="search-form-wrapper">
      <div className="search-row first--row">
        <Select
          className="white first--row-input input--general"
          options={[
            { value: 1, label: "Venta" },
            { value: 2, label: "Alquiler" },
          ]}
          isSearchable={false}
          isMulti={true}
          placeholder="Tipo de Operación"
          onChange={(opt) => {
            setFormData({
              operation_type: opt.map((item) => item.value),
            });
          }}
          fixes={true}
        />
        <Select
          className="white first--row-input input--general"
          options={[] /* Aquí puedes usar propertiesSelectOptions */}
          isSearchable={false}
          placeholder="Tipo de Propiedad"
          onChange={(opt) => {
            setFormData({ property_type: opt.value });
          }}
          fixes={true}
        />
        <Dropdown
          className="white first--row-input"
          placeholder="Dormitorios"
          close={close.rooms}
          value={getDropdownValue(
            formData?.min_rooms,
            formData?.max_rooms,
            "Dorms."
          )}
        >
          <div className="dropdown-row">
            <span className="row-label">Min.</span>
            <Input
              className="input--general"
              type="number"
              placeHolder="-"
              min={0}
              value={formData?.min_rooms}
              onChange={(e) => {
                setFormData({ min_rooms: e?.currentTarget?.value });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setFormData({ min_rooms: e?.currentTarget?.value });
                  setClose({ rooms: !close.rooms });
                }
              }}
            />
          </div>
          <div className="dropdown-row">
            <span className="row-label">Max.</span>
            <Input
              className="input--general"
              type="number"
              placeHolder="-"
              min={formData?.min_rooms}
              value={formData?.max_rooms}
              onChange={(e) => {
                setFormData({ max_rooms: e?.currentTarget?.value });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setFormData({ max_rooms: e?.currentTarget?.value });
                  setClose({ rooms: !close.rooms });
                }
              }}
            />
          </div>
        </Dropdown>
      </div>
      <div className="search-row second--row">
        <Select
          options={localidades}
          isMulti={true}
          placeholder="Barrios"
          hideSelectedOptions={true}
          styles={{
            container: (provided, state) => ({
              ...provided,
              marginBottom: 15,
            }),
          }}
          onChange={(opt) => {
            setFormData({
              locations: opt.map((item) => item.value),
            });
          }}
        />
      </div>
      <div className="search-row third--row">
        <div className="range-wrapper">
          <span className="price-text">Precio</span>
          <div className="price-range range--home">
            <MultiRange
              customWidth={336}
              min={0}
              max={3000000}
              step={20000}
              onChange={({ minVal, maxVal }) => {
                setFormData({ price_from: minVal, price_to: maxVal });
              }}
            />
            <div className="price-input-wrapper">
              <Input
                className="input--price bottomLine"
                type="text"
                maxLength={15}
                value={formatToMoney(
                  formData.price_from.toString(),
                  true,
                  "USD",
                  false
                )}
                onChange={() => {}}
              />
              <div className="input-divider" />
              <Input
                className="input--price bottomLine"
                type="text"
                maxLength={15}
                value={
                  formData.price_to >= 3000000
                    ? formatToMoney(
                        formData.price_to.toString(),
                        true,
                        "USD +",
                        false
                      )
                    : formatToMoney(
                        formData.price_to.toString(),
                        true,
                        "USD",
                        false
                      )
                }
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
        <Button
          className="third--row-button"
          text="Buscar"
          type="secondary shine"
          onClick={handleSubmit}
        />
      </div>
      <div className="search-row fourth--row">
        <Button
          className="fourth--row-button"
          text="Quiero vender"
          link="/quiero-vender"
        />
      </div>
    </div>
  );
};

export default SearchHomeForm;
