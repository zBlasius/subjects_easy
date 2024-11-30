import Course from "./Course";
import User from "./User";
import File from "./File";
import HeadProgress from "./HeadProgress";
import Progress from "./Progress";
class Database {
  constructor() {}

  mongodbModels() {
    return {
      course: Course,
      user: User,
      file: File,
      headProgress: HeadProgress,
      progress: Progress
    };
  }

}

export default Database;
