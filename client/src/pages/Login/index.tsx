import React, { useState } from "react";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import './index.scss'
import request from "../../utils/request";

export default function Login() {
    const [user, setUser] = useState<string>()
    const [pass, setPass] = useState<string>()

    function login(){
        request("/login", "GET", {
            email:"blasiusgustavo19@gmail.com",
            password:123
        }).then(ret=>{
            console.log('ret', ret);
        })
    }

    return (
        <div>
            <CardCenter>
                <span className="login-title"> Twygo </span>

                <MyInput placeholder="Login" onChange={(e)=> setUser(e.target.value) } />
                <MyInput placeholder="Senha" onChange={(e)=> setPass(e.target.value) } />

                <div className="button-group">

                    <div className="login-button-section">
                        <MyButton onClick={()=> login()} label="Entrar" />
                        <a href="#"> Esqueci minha senha </a>
                    </div>

                    <div className="line"> </div>
                    <MyButton label="Registre-se" />
                </div>

            </CardCenter>
        </div>
    )
}
