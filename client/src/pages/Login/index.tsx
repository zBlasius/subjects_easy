import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import './index.scss'
import request from "../../utils/request";
import DataContext from "../../data/Contesxt";

export default function Login() {
    const [pass, setPass] = useState<string>()
    const { setCourseList, setUser, user } = useContext(DataContext)
    const navigate = useNavigate();

    function login() {
        request("/login", "GET", {
            email: user?.toString(),
            password: pass?.toString()
        }).then(ret => {
            if (ret.auth) {
                getCourseList()
                navigate("/course-list")
            }
        })
    }

    function getCourseList() {
        request("/list_all_course", "GET", {
            email: user?.toString()
        }).then(ret=>{
            setCourseList(ret.list);
        }).catch(err=>{
            console.error(err);
            setCourseList([]);
        })
        
    }

    return (
        <div>
            <CardCenter>
                <span className="login-title"> Twygo </span>

                <MyInput placeholder="Login" onChange={(e) => setUser(e.target.value)} />
                <MyInput placeholder="Senha" onChange={(e) => setPass(e.target.value)} />

                <div className="button-group">

                    <div className="login-button-section">
                        <MyButton onClick={() => login()} label="Entrar" />
                        <a href="#"> Esqueci minha senha </a>
                    </div>

                    <div className="line"> </div>
                    <MyButton disabled={true} label="Registre-se" />
                </div>

            </CardCenter>
        </div>
    )
}
