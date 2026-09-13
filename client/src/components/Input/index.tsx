import { ChangeEvent, KeyboardEvent } from "react";
import { InputText } from "primereact/inputtext";
import "./index.scss";

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}

const MyInput = ({
  onChange,
  onKeyDown,
  value,
  placeholder,
  type,
  autoFocus,
}: MyInputProps) => {
  return (
    <div style={{ width: "100%", margin: "10px 0px 10px 0px" }}>
      <InputText
        style={{ width: "100%", height: "100%"}}
        type={type ?? "text"}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default MyInput;
