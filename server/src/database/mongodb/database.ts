import Course from "./Course";
import User from "./User";
class Database {
  constructor() {}

  mongodbModels() {
    return {
      course: Course,
      user: User
    };
  }

}

export default Database;
