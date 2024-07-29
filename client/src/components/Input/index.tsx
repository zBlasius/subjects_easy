import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import './index.scss'

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: string;
  value?: string;
  placeholder?: string
  type?: string
}

const MyInput = ({ onChange, label, value, placeholder, type }: MyInputProps) => {
  return (
    <Form.Group style={{width:'100%', height:"100%"}}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type ?? "text"} style={{backgroundColor: '#cecece', border: '1px solid white'}} className="input-main" onChange={onChange} value={value} placeholder={placeholder} />
    </Form.Group>
  );
}

export default MyInput;

