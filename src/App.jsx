import { useState } from "react";
import "./App.css";
import CustomSelect from "./components/customSelect/CustomSelect";
import InputField from "./components/inputField/InputField";

const mainDishItems = [
  { label: "burger", value: 1 },
  { label: "kebab", value: 2 },
  { label: "shwarma", value: 3 },
  { label: "falafel", value: 4 },
];

const sideDishItems = [
  { label: "french fries", value: 1 },
  { label: "onion rings", value: 2 },
  { label: "mashed peas", value: 3 },
  { label: "green peas", value: 4 },
];

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [meal, setMeal] = useState({ mainDish: "", sideDish: "" });

  // This is causing a problem in react.
  function alertSelectedDish() {
    alert(`You have ordered ${JSON.stringify(meal)}`);
  }

  function onMainDishChange(mainDishId) {
    setMeal({ ...meal, mainDish: mainDishId });
  }

  function onSideDishChange(sideDishId) {
    setMeal({ ...meal, sideDish: sideDishId });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const customerOrder = {
      name,
      email,
      address,
      meal,
    };
    console.log(customerOrder);
  }

  return (
    <>
      <h2>Place your order</h2>
      <form id="form" onSubmit={handleSubmit}>
        <div className="input-field-div">
          <InputField
            setValue={setName}
            value={name}
            fieldName="name"
            type="text"
          />
          <InputField
            setValue={setEmail}
            value={email}
            fieldName="email"
            type="email"
          />
          <InputField
            setValue={setAddress}
            value={address}
            fieldName="address"
            type="text"
          />
        </div>

        <CustomSelect
          onChange={onMainDishChange}
          options={mainDishItems}
          placeHolder={"Search your main dish"}
          alertFunc={alertSelectedDish}
        />
        <hr />
        <CustomSelect
          onChange={onSideDishChange}
          isMultiSelect
          options={sideDishItems}
          placeHolder={"Search your side dish"}
          alertFunc={alertSelectedDish}
        />
        <button type="submit">Send your order</button>
      </form>
    </>
  );
}

export default App;
