import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import View from "./View";
import DataContext from "../../data/Contesxt";

export default function Container() {
  const [courseData, setCourse] = useState({
    title: "",
    description: "",
    videoList: [{ description: "", title: "", bucketUrl: "" }],
  });
  const [firstAcess, setFirstAcess] = useState(false);
  const { userInfo } = useContext(DataContext);

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    checkCourseInitialize();
  }, []);

  function getCourseById() {
    request("/course/get_by_id", "GET", { id: courseId }).then((ret) => {
      if (ret) {
        setCourse(ret);
        setFirstAcess(false);
      }
    });
  }

  function checkCourseInitialize() {
    if (userInfo.type == "Teacher") return getCourseById();

    request("/get_head_progress", "GET", { courseId }).then((ret) => {
      if (ret) {
        return getCourseById();
      }

      setFirstAcess(true);
    });
  }

  function activateCourse() {
    request("/progress/create", "POST", { courseId }).then((ret) => {
      if (ret) {
        getCourseById();
      }
    });
  }

  return (
    <View
      firstAcess={firstAcess}
      courseData={courseData}
      navBarFirstLabel="Back"
      navBarFirstFunc={() => navigate(`/course-list`)}
      navBarSecondLabel="New video"
      navBarSecondFunc={() => navigate(`/new-video/${courseId}`)}
      typeUser={userInfo.type}
      handleStartCourse={() => {
        activateCourse();
      }}
    />
  );
}
