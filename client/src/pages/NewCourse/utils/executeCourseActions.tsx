import request from "../../../utils/request";

export function executeCourseActions() {
  const createCourse = async (
    titleCourse: string,
    descriptionCourse: string,
  ) => { 
    const newData = {
      title: titleCourse,
      description: descriptionCourse,
    };  

    await request("/course/create", "POST", newData);
  };

  const getCourseList = async (user: string) => {
    const list = await request("/course/list", "GET", {
      email: user,
    });
    return list;
  };

  return {
    createCourse,
    getCourseList,
  };
}
