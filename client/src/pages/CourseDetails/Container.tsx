import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import View from "./View";

export default function Container() {
  const [courseData, setCourse] = useState({
    title: "",
    description: "",
    videoList: [{ description: "", title: "", bucketUrl: "" }],
  });

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    getCourseById();
  }, []);

  function getCourseById() {
    request("/course/get_by_id", "GET", { id: courseId }).then((ret) => {
      console.log("ret", ret);
      if (ret) {
        setCourse(ret);
      }
    });
  }

  return (
    <View
      courseData={courseData}
      navBarFirstLabel="Back"
      navBarFirstFunc={() => navigate(`/course-list`)}
      navBarSecondLabel="Create new video"
      navBarSecondFunc={() => navigate(`/new-video/${courseId}`)}
    />
  );
}
