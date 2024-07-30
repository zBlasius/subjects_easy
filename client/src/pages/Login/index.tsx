import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import './index.scss'
import request from "../../utils/request";
import DataContext from "../../data/Contesxt";
import { TextColors } from "../../utils/STYLES";
import { Password } from 'primereact/password';
import MyInputPassword from "../../components/InputPassword";


export default function Login() {
    const [pass, setPass] = useState<string>("")
    const [error, setError] = useState(false);
    const { setCourseList, setUser, user } = useContext(DataContext)
    const navigate = useNavigate();

    function login() {
        request("/login", "POST", {
            email: user?.toString(),
            password: pass?.toString()
        }).then(ret => {
            if (ret.token) {
                localStorage.setItem("Authorization", ret.token)
                getCourseList();
                navigate("/course-list")
            }
        }).catch(err=>{
            console.log('caiu aqui')
            setError(true)
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
            <CardCenter className="backgroud-dark-theme">
                <span className="login-title"> App </span>

                <MyInput placeholder="Login" onChange={(e) => setUser(e.target.value)} />

                <MyInputPassword value={pass} onChange={(e)=> setPass(e.target.value)} />

                {error && <span style={{color:TextColors.errorText, textAlign:'left', width:"100%"}}> * Login or password invalid </span>}
                <div className="button-group">

                    <div className="login-button-section">
                        <MyButton variant="outline-primary" onClick={() => login()} label="Entrar" />
                        <a href="#"> Esqueci minha senha </a>
                    </div>

                    <MyButton variant="outline-primary" onClick={()=> navigate("/register")} label="Registre-se" />
                </div>


            </CardCenter>
        </div>
    )
}
