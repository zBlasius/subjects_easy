import { ChangeEvent, useState } from "react";
import "./index.scss";
import { InputGroup, Form } from "react-bootstrap";
import { RadioButton } from "primereact/radiobutton";

interface MyInputProps {
  onChange: (value: string) => void;
  options: {
    value: string;
    text: string;
  }[];
  selectedValue: string
}

const RadioGroup = ({ options, selectedValue, onChange }: MyInputProps) => {

  return (
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
      {options.map((item) => (
        <div className="flex align-items-center">
          <RadioButton
            name="pizza"
            value={item}
            onChange={()=> onChange(item.value)}
            checked={selectedValue === item.value}
            style={{marginRight:10}}
          />
          <label style={{fontWeight:600}} className="ml-2">{item.text}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
