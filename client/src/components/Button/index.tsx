import React, { MouseEvent, ChangeEvent } from "react";
import Button from 'react-bootstrap/Button';
import "./index.scss"

interface MyButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  variant?: string;
  disabled?: boolean
}

const MyButton = ({ onClick, label, variant = "primary", disabled = false }: MyButtonProps) => {
  return (
    <Button disabled={disabled} className="button-main" style={{borderRadius:30, width: "100%", height:"100%"}} variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}

export default MyButton;
