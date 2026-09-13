import  { useContext, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router";
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
    const [loading, setLoading] = useState(false);
    const { setUser,setUserInfo, user } = useContext(DataContext)
    const navigate = useNavigate();

    const canSubmit = !!user?.toString().trim() && !!pass.trim();

    function login() {
        if (!canSubmit || loading) return;

        setError(false);
        setLoading(true);

        request("/login", "POST", {
            email: user?.toString(),
            password: pass?.toString()
        }).then(ret => {
            console.log("ret2", ret)
            if (ret.token) {
                localStorage.setItem("Authorization", ret.token)
                setUserInfo(ret.userInfo)
                navigate("/course-list")
                return
            }

            setLoading(false)
        }).catch(err=>{
            setError(true)
            setLoading(false)
        })
    }

    function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") login()
    }

    return (
        <div>
            <CardCenter className="background-dark-theme">
                <span className="login-title"> App </span>
                <p className="login-subtitle">Sign in to continue</p>

                <MyInput
                    value={user}
                    placeholder="Email"
                    autoFocus
                    onChange={(e) => setUser(e.target.value)}
                    onKeyDown={handleEnter}
                />

                <MyInputPassword
                    placeholder="Password"
                    value={pass}
                    onChange={(e)=> setPass(e.target.value)}
                    onKeyDown={handleEnter}
                />

                {error && <span role="alert" style={{color:TextColors.errorText, textAlign:'left', width:"100%"}}> * Login or password invalid </span>}
                <div className="button-group">

                    <div className="login-button-section">
                        <MyButton
                            variant="primary"
                            onClick={() => login()}
                            label="Login"
                            loading={loading}
                            disabled={!canSubmit}
                        />
                        <a href="#" onClick={(e) => e.preventDefault()}> Forgot your password? </a>
                    </div>

                    <div className="divider">
                        <span className="line" />
                        <span className="divider-text">or</span>
                        <span className="line" />
                    </div>

                    <div className="register-prompt">
                        Don't have an account?{" "}
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register") }}>Register</a>
                    </div>
                </div>


            </CardCenter>
        </div>
    )
}
