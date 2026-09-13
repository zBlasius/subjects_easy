import React, { ChangeEvent, KeyboardEvent } from "react";
import { Password } from "primereact/password";
import "./index.scss"

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string
}

const MyInputPassword = ({ onChange, onKeyDown, value, placeholder }: MyInputProps) => {
  return (
    <div style={{ width: "100%", margin: "10px 0px 10px 0px" }}>
      <Password
        placeholder={placeholder}
        style={{ width: "100%", height: "100%" }}
        inputStyle={{width:"100%"}}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        toggleMask
        feedback={false}
      />
    </div>
  );
};

export default MyInputPassword;
