interface UploadFileParams {
  fileName: string;
  fileContent: Buffer;
  mimeType: string;
}

export interface IS3Service {
  /**
   *
   * Should list
   *
   */
  uploadFile({
    fileName,
    fileContent,
    mimeType,
  }: UploadFileParams): Promise<string>;

  getS3FileUrl(fileName: string): Promise<string>;

  downloadFile(fileName: string, destinationPath: string): Promise<string>;
}
