import { Injectable, Provider } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { extname } from 'path';
import { FILE_UPLOAD_SERVICE } from './inject-key';
import { IFileUpload } from 'src/infrastructure/ports/file-upload/file-upload.interface';

@Injectable()
export class FileUploadService implements IFileUpload {
  async upload(
    path: string,
    buffer: Buffer,
    fileName: string,
  ): Promise<string> {
    const extension = extname(fileName);

    const newFileName = this.generateUniqueFilename(extension);

    let existsPath = 'assets/';

    path.split('/').forEach(async (val) => {
      existsPath = existsPath + val + '/';
      if (val && !existsSync(existsPath)) {
        await mkdir(existsPath);
      }
    });

    const filePath = path + newFileName;

    try {
      await writeFile(`assets/${filePath}`, buffer);
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async remove(path: string): Promise<void> {
    await unlink('assets/' + path);
  }

  private generateUniqueFilename(extension: string): string {
    const randomString = Math.random().toString(36).substring(2, 15);
    const filename = `-${randomString}${extension}`;

    return filename;
  }
}

export const FileUploadProvider: Provider = {
  provide: FILE_UPLOAD_SERVICE,
  useClass: FileUploadService,
};
