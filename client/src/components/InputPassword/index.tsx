import React, { ChangeEvent} from "react";
import { Password } from 'primereact/password';

interface MyInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string
}

const MyInputPassword = ({ onChange, value }: MyInputProps) => {

  return (
    <div style={{width:"100%", margin: "10px 0px 10px 0px"}}>
        <Password inputStyle={{width:"100%"}} style={{width:"100%"}} value={value} onChange={onChange} toggleMask feedback={false} />
    </div>
  );
}

export default MyInputPassword;
