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

export default function Register() {
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const { setCourseList, setUser, user } = useContext(DataContext);
  const navigate = useNavigate();

  function register() {
    request("/register", "POST", {
      email: user?.toString(),
      password: pass?.toString(),
    }).then((ret) => {
      console.log("teste", ret);
      if (ret.token) {
        localStorage.setItem("Authorization", ret.token);
        getCourseList();
        navigate("/course-list");
      }
    });
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <MyInputPassword
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

        <RadioGroup
          options={[
            { value: "Student", text: "I'm Student" },
            { value: "Teacher", text: "I'm Teacher" },
          ]}
        />
      </CardCenter>
    </div>
  );
}
