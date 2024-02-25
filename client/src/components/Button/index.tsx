import React, { MouseEvent, ChangeEvent } from "react";
import Button from 'react-bootstrap/Button';
import "./index.scss"

interface MyButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  variant?: string;
}

const MyButton = ({ onClick, label, variant = "primary" }: MyButtonProps) => {
  return (
    <Button className="button-main" style={{borderRadius:30, width: "100%"}} variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}

export default MyButton;