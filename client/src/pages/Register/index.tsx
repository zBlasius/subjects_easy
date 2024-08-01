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
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    type: "",
    pass: "",
    confirmPass: "",
  });
  const [invalidData, setInvalidData] = useState(false);
  const { setCourseList } = useContext(DataContext);
  const navigate = useNavigate();

  async function register() {
    if (!hasAllNecessaryData()) {
      setError(true);
      return;
    }
    setError(false);

    request("/register", "POST", {
      email: userData.email.toString(),
      password: userData.pass.toString(),
      type: userData.type,
      fullName: userData.fullName,
    })
      .then((_) => {
        navigate("/login");
      })
      .catch((_) => {
        setInvalidData(true);
      });
  }

  function hasAllNecessaryData() {
    return Object.values(userData).every((item) => item);
  }

  return (
    <div>
      <CardCenter className="background-dark-theme">
        <span className="register-title"> App </span>

        <MyInput
          placeholder="Full name"
          value={userData.fullName}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
        />

        <MyInput
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <MyInputPassword
          placeholder={"Password"}
          value={userData.pass}
          onChange={(e) => setUserData({ ...userData, pass: e.target.value })}
        />

        <MyInputPassword
          placeholder={"Confirm password"}
          value={userData.confirmPass}
          onChange={(e) =>
            setUserData({ ...userData, confirmPass: e.target.value })
          }
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

        {error && (
          <div style={{ color: TextColors.errorText }}>
            {" "}
            *Check informed data{" "}
          </div>
        )}

        {invalidData && (
          <div style={{ color: TextColors.errorText }}>
            {" "}
            *Some data is invalid. Please check informed data{" "}
          </div>
        )}

        <RadioGroup
          options={[
            { value: "Student", text: "I'm Student" },
            { value: "Teacher", text: "I'm Teacher" },
          ]}
          onChange={(value) => setUserData({ ...userData, type: value })}
          selectedValue={userData.type}
        />
      </CardCenter>
    </div>
  );
}
