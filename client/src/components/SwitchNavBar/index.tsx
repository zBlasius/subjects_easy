import MyButton from "../Button";
import Navbar from "../NavBar";
import SearchBar from "../SearchBar";

interface SwitchNavBarProps {
    typeUser: string;
  teacherTitle?: string;
  teacherActionButon?: () => void;
  teacherTextButton?: string;
}

export default function SwitchNavBar({
  teacherTitle,
  teacherActionButon,
  teacherTextButton,
  typeUser,
}: SwitchNavBarProps) {
  return typeUser == "Teacher" ? (
    <Navbar
      firstColumn={<h3> {teacherTitle} </h3>}
      secondColumn={
        <MyButton
          onClick={teacherActionButon}
          label={teacherTextButton || ""}
        />
      }
    />
  ) : (
    <SearchBar/>
  );
}
