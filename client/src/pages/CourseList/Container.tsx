import { useContext, useEffect } from "react";
import DataContext from "../../data/Contesxt";
import { useNavigate } from "react-router-dom";
import View from "./View";
import request from "../../utils/request";

export default function Container() {
  const { courseList, setCourseList, userInfo } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseList();
  }, []);

  function getCourseList() {
    request("/course/list", "GET")
      .then((ret) => {
        setCourseList(ret);
      })
      .catch((err) => {
        setCourseList([]);
      });
  }

  function navigateFunc(id?:string){
    if(!id) return;
    return navigate(`/course-details/${id}`)
  }

  return (
    <View
      navbarButton={() => navigate("/new-course")}
      courseList={courseList}
      onClick={(id?:string) => navigateFunc(id)}
      typeUser={userInfo.type}
    />
  );
}
