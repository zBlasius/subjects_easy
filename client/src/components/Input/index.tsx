import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import './index.scss'

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: string;
  value?: string;
  placeholder?: string
}

const MyInput = ({ onChange, label, variant = "primary", value, placeholder }: MyInputProps) => {
  return (
    <Form.Group style={{width:'100%'}}>
      <Form.Label>{label}</Form.Label>
      <Form.Control className="input-main" type="text" onChange={onChange} value={value} placeholder={placeholder} />
    </Form.Group>
  );
}

export default MyInput;

