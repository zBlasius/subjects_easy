import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import './index.scss'
import request from "../../utils/request";
import DataContext from "../../data/Contesxt";
import { TextColors } from "../../utils/STYLES";
import MyInputPassword from "../../components/InputPassword";


export default function Login() {
    const [pass, setPass] = useState<string>("")
    const [error, setError] = useState(false);
    const { setUser,setUserInfo, user } = useContext(DataContext)
    const navigate = useNavigate();

    function login() {
        request("/login", "POST", {
            email: user?.toString(),
            password: pass?.toString()
        }).then(ret => {
            if (ret.token) {
                localStorage.setItem("Authorization", ret.token)
                navigate("/course-list")
            }
            setUserInfo(ret.userInfo)
        }).catch(err=>{
            setError(true)
        })
    }

    return (
        <div>
            <CardCenter className="background-dark-theme">
                <span className="login-title"> App </span>

                <MyInput value={user} placeholder="Login" onChange={(e) => setUser(e.target.value)} />

                <MyInputPassword placeholder="Password" value={pass} onChange={(e)=> setPass(e.target.value)} />

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
