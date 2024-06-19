import { Global, Module } from '@nestjs/common';
import { FileUploadProvider } from './file-upload.service';

@Global()
@Module({
  providers: [FileUploadProvider],
  exports: [FileUploadProvider],
})
export class FileUploadModule {}
