import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/Input";
import CardCenter from "../../components/CardCenter";
import MyButton from "../../components/Button";
import "./index.scss";
import request from "../../utils/request";
import DataContext from "../../data/Contesxt";
import RadioGroup from "../../components/RadioGroup";
import MyInputPassword from "../../components/InputPassword";
import { TextColors } from "../../utils/STYLES";

export default function Register() {
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState(false)
  const [typeUser, setTypeUser] = useState("");
  const [user, setUser] = useState("")
  const { setCourseList } = useContext(DataContext);
  const navigate = useNavigate();

  async function register() {
    if(!hasAllNecessaryData()){
      setError(true);
      return
    }
    setError(false);

    const result = await request("/register", "POST", {
      email: user?.toString(),
      password: pass?.toString(),
      typeUser
    });

    if (result.token) {
      localStorage.setItem("Authorization", result.token);
      getCourseList();
      navigate("/course-list");
    } 
  }

  function hasAllNecessaryData(){
    return (pass && confirmPass && pass === confirmPass && user && typeUser)
  }

  function getCourseList() {
    request("/list_all_course", "GET", {
      email: user?.toString(),
    })
      .then((ret) => {
        setCourseList(ret.list);
      })
      .catch((err) => {
        console.error(err);
        setCourseList([]);
      });
  }

  return (
    <div>
      <CardCenter className="backgroud-dark-theme">
        <span className="register-title"> App </span>

        <MyInput
          placeholder="Email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <MyInputPassword
          placeholder={"Password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <MyInputPassword
          placeholder={"Confirm password"}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <div className="button-group">
          <div className="register-button-section">
            <MyButton
              variant="outline-primary"
              onClick={() => register()}
              label="Register"
            />
          </div>
        </div>

        {error && <div style={{color:TextColors.errorText}}> *Check informed data </div> }

        <RadioGroup
          options={[
            { value: "Student", text: "I'm Student" },
            { value: "Teacher", text: "I'm Teacher" },
          ]}
          onChange={(value)=> setTypeUser(value)}
          selectedValue={typeUser}
        />
      </CardCenter>
    </div>
  );
}
