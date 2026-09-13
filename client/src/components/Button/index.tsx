import React, { MouseEvent } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./index.scss";

interface MyButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  className?: string;
}

const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ onClick, label, variant = "primary", disabled = false, loading = false, style, className }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={["button-main", className].filter(Boolean).join(" ")}
        style={{ borderRadius: 15, width: "100%", height: "100%", ...style }}
        variant={variant}
        onClick={onClick}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: 8 }}
            />
            {label}
          </>
        ) : (
          label
        )}
      </Button>
    );
  }
);

MyButton.displayName = "MyButton";

export default MyButton;
