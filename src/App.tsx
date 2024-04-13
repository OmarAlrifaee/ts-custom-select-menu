import { useState } from "react";
import Select from "./components/select/Select";
import { SelectOption } from "./components/select/select.types";
const options: SelectOption[] = [
  { label: "first", value: 1 },
  { label: "second", value: 2 },
  { label: "third", value: 3 },
  { label: "fourth", value: 4 },
  { label: "fift", value: 5 },
];
function App() {
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);
  return (
    <>
      <Select
        options={options}
        value={value1}
        onChange={(option) => setValue1(option)}
      />
      <br />
      <Select
        options={options}
        value={value2}
        onChange={(option) => setValue2(option)}
        multi
      />
    </>
  );
}

export default App;
