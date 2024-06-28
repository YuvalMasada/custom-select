import "./InputField.css";

export default function InputField({ value, setValue, type, fieldName }) {
  function handleChange(e) {
    setValue(e.target.value);
  }

  function clearInput() {
    setValue("");
  }

  return (
    <div className="input-div">
      <label>{fieldName}: </label>
      <input
        value={value}
        onChange={handleChange}
        name={fieldName}
        type={type}
      />
      <span className="clear-input-x" onClick={clearInput}>
        X
      </span>
    </div>
  );
}
