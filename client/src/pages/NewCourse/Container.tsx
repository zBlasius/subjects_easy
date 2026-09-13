import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { executeCourseActions } from "./utils/executeCourseActions";
import View from "./View";
import DataContext from "../../data/Contesxt";

export default function Container() {
  const { user, setCourseList } = useContext(DataContext);
  const [titleCourse, setTitleCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const [creating, setCreating] = useState(false);
  const { createCourse, getCourseList } = executeCourseActions();
  const navigate = useNavigate();

  async function handleCreateCourse() {
    setCreating(true);
    try {
      await createCourse(titleCourse, descriptionCourse);
      const list = await getCourseList(user?.toString());
      setCourseList(list);
      navigate("/course-list");
    } catch (error) {
      setCreating(false);
    }
  }

  return (
    <View
      handleChangeTitle={setTitleCourse}
      handleChangeDescription={setDescriptionCourse}
      actionButtonCreate={handleCreateCourse}
      handleBack={() => navigate("/course-list")}
      creating={creating}
    />
  );
}
