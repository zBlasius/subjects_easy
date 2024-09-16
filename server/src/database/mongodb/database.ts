import Course from "./Course";
import User from "./User";
import File from "./File";
class Database {
  constructor() {}

  mongodbModels() {
    return {
      course: Course,
      user: User,
      file: File
    };
  }

}

export default Database;
