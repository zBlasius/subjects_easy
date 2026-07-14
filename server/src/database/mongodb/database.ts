import Course from "./Course";
import User from "./User";
import File from "./File";
import HeadProgress from "./HeadProgress";
import Progress from "./Progress";
import Job from "./Job";
class Database {
  constructor() {}

  mongodbModels() {
    //User.updateMany({}, { $set: { type: "Student" } }).exec(); 
    return {
      course: Course,
      user: User,
      file: File,
      headProgress: HeadProgress,
      progress: Progress,
      job: Job
    };
  }

}

export default Database;
