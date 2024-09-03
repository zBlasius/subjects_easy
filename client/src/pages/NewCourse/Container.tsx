import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { executeCourseActions } from "./utils/executeCourseActions";
import View from "./View";
import DataContext from "../../data/Contesxt";

export default function Container() {
  const { user, setCourseList } = useContext(DataContext);
  const [titleCourse, setTitleCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const { createCourse, getCourseList } = executeCourseActions();
  const navigate = useNavigate();

  async function handleCreateCourse() {
    await createCourse(titleCourse, descriptionCourse);
    const list = await getCourseList(user?.toString());
    setCourseList(list);
    navigate("/course-list"); 
  }

  return (
    <View
      handleChangeTitle={setTitleCourse}
      handleChangeDescription={setDescriptionCourse}
      actionButtonCreate={handleCreateCourse}
    />
  );
}
