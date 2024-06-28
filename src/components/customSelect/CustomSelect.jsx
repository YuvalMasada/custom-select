import { useState, useEffect } from "react";
import "./CustomSelect.css";

export default function CustomSelect({
  onChange,
  options,
  isMultiSelect,
  placeHolder,
  alertFunc,
}) {
  const [searchFilter, setFilter] = useState("");
  const [selected, setSelected] = useState([]);
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    onChange(selected);
    if (selected.length) {
      const dishSelected = options
        .filter((option) => selected.includes(option.value))
        .map((dish) => dish.label);
      // alertFunc(dishSelected);
    }
  }, [selected]);

  function selectDeselectAll(e) {
    e.preventDefault();
    if (options.length == selected.length) {
      setSelected([]);
    } else {
      const allPossibleValues = options.map((option) => option.value);
      setSelected(allPossibleValues);
    }
  }

  function filterOptions() {
    if (searchFilter == "") {
      return options;
    }
    const filteredOptions = options.filter((option) =>
      option.label.includes(searchFilter)
    );
    return filteredOptions;
  }

  const filteredOptions = filterOptions(options);

  const SelectComponent = isMultiSelect ? (
    <MultiSelectView
      options={filteredOptions}
      values={selected}
      setValues={setSelected}
    />
  ) : (
    <SingleSelectView
      options={filteredOptions}
      values={selected}
      setValues={setSelected}
    />
  );

  return (
    <div className="custom-select">
      <div>
        <input
          placeholder={placeHolder}
          values={searchFilter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div
          className="toggle-options"
          onClick={() => setIsCollapse((prev) => !prev)}
        >
          {isCollapse ? "↓" : "↑"}
        </div>
      </div>
      {!isCollapse && <ul className="custom-select-list">{SelectComponent}</ul>}
      {isMultiSelect ? (
        <div className="selectAllOptions">
          <button onClick={selectDeselectAll}>
            {options.length == selected.length ? "Deselect All" : "Select All"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SingleSelectView({ options, setValues, values }) {
  return (
    <>
      {options.map((option) => {
        const listClass = `single-select${
          values.includes(option.value) ? " selected" : ""
        }`;
        return (
          <li
            onClick={() => setValues([option.value])}
            className={listClass}
            key={option.label}
          >
            <label>{option.label}</label>
          </li>
        );
      })}
    </>
  );
}

function MultiSelectView({ options, setValues, values }) {
  function handleCheckboxClick(e, option) {
    if (values.includes(option.value)) {
      const updatedValues = values.filter((value) => value !== option.value);
      setValues(updatedValues);
    } else {
      setValues([...values, option.value]);
    }
  }

  return (
    <>
      {options.map((option) => (
        <li className="multi-select-option" key={option.label}>
          <input
            checked={values.includes(option.value)}
            type="checkbox"
            onChange={(e) => handleCheckboxClick(e, option)}
          />
          <label>{option.label}</label>
        </li>
      ))}
    </>
  );
}
