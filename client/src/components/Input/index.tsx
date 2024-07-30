import { ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: string;
  value?: string;
  placeholder?: string;
  type?: string;
}

const MyInput = ({
  onChange,
  value,
  placeholder,
  type,
}: MyInputProps) => {
  return (
    <div style={{ width: "100%", margin: "10px 0px 10px 0px" }}>
      <InputText
        style={{ width: "100%", height: "100%"}}
        type={type ?? "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MyInput;
