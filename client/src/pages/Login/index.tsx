import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import './index.scss'
import request from "../../utils/request";
import DataContext from "../../data/Contesxt";

const data = [
    { id: 123, courseTitle: "Big Data & Analutics" },
    { id: 345, courseTitle: "Business Inteligence" },
    { id: 567, courseTitle: "Customer Experience Managemente" },
    { id: 789, courseTitle: "User Expirience" },
]

export default function Login() {
    const [user, setUser] = useState<string>()
    const [pass, setPass] = useState<string>()
    const { setCourseList } = useContext(DataContext)
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
        setCourseList(data)
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
