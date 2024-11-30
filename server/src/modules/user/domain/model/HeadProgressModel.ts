import { ObjectId } from "mongodb";

export class HeadProgressModel {
  id: string | ObjectId;
  courseId: string | ObjectId;
  status: string;
  userId: string | ObjectId;

  constructor(properties: {
    courseId: string | ObjectId;
    status: string;
    _id: string | ObjectId;
    userId: string | ObjectId;
  }) {
    const { _id, status, courseId, userId } = properties;
    this.id = _id;
    this.status = status;
    this.courseId = courseId
    this.userId = userId
  }
}
