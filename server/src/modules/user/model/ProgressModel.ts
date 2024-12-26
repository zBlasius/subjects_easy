import { ObjectId } from "mongodb";

export class ProgressModel {
  id: string | ObjectId;
  headProgressId: string;
  videoId: string;
  status: string;

  constructor(properties: {
    headProgressId: string;
    videoId: string;
    status: string;
    _id: string | ObjectId;
  }) {
    const { headProgressId, videoId, status, _id } = properties;
    this.id = _id;
    this.headProgressId = headProgressId;
    this.videoId = videoId;
    this.status = status;
  }
}
