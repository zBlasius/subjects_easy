import { ChangeEvent, useState } from "react";
import "./index.scss";
import { InputGroup, Form } from "react-bootstrap";
import { RadioButton } from "primereact/radiobutton";

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  options: {
    value: string;
    text: string;
  }[];
}

const RadioGroup = ({ options, onChange }: MyInputProps) => {
  const [ingredient, setIngredient] = useState("");

  return (
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
      {options.map((item) => (
        <div className="flex align-items-center">
          <RadioButton
            name="pizza"
            value={item}
            onChange={(e) => setIngredient(item.value)}
            checked={ingredient === item.value}
            style={{marginRight:10}}
          />
          <label style={{fontWeight:600}} className="ml-2">{item.text}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
