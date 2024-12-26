import FileModel from "../../../model/FileModel";

export interface IFileService {
  /**
   * Retrieves a list of files associated with a specific course ID.
   *
   * @param {string} courseId - The unique identifier of the course.
   * @returns {Promise<FileModel[] | undefined>} A promise that resolves with an array of FileModel or undefined if no files are found.
   */
  listByCourseId(courseId: string): Promise<FileModel[] | undefined>;

  /**
   * Creates a new file record associated with a course.
   *
   * @param {Object} param - The file and course details.
   * @param {string} param.courseId - The unique identifier of the course.
   * @param {Buffer} param.file - The file content as a buffer.
   * @returns {Promise<void>} A promise that resolves when the file is successfully created.
   */
  create(param: {
    courseId: string;
    file: Buffer;
    fileName: string;
    title: string;
    description: string;
    mimeType: string;
  }): Promise<FileModel>;

  /**
   * Saves the file content to a storage service and returns the file URL.
   *
   * @param {Object} params - The file details.
   * @param {Buffer} params.fileContent - The content of the file as a buffer.
   * @param {string} params.fileName - The name of the file to be saved.
   * @returns {Promise<string>} A promise that resolves with the URL of the saved file.
   */
  saveFile(params: { fileContent: Buffer; fileName: string; mimeType: string }): Promise<string>;
}
