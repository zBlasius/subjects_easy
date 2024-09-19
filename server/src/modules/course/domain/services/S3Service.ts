import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { IS3Service } from './contracts';
import { injectable } from 'inversify';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
}); 

interface UploadFileParams {
  fileName: string;
  fileContent: Buffer;
  mimeType: string;
}

@injectable()
export class S3Service implements IS3Service{
  private bucketName: string; 

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
  }

  async uploadFile({ fileName, fileContent, mimeType }: UploadFileParams): Promise<string> {

    const params: PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,  
      Body: fileContent, 
      ContentType: mimeType, 
    };

    try {
      const result = await s3.upload(params).promise();
      //! Porque não está retornando a string ?????????
      return result.Location; // Retorna a URL do arquivo no S3 
    } catch (error) {
      console.error('Erro ao fazer upload para o S3:', error);
      throw new Error('Erro ao fazer upload do arquivo');
    }
  }
}
 