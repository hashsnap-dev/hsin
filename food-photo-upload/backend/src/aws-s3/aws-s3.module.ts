import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import * as AWS from 'aws-sdk';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  exports: [S3Module],
})
export class S3Module {
  s3: AWS.S3;

  constructor(private configService: ConfigService<{ [key: string]: string }>) {
    this.s3 = new AWS.S3({
      accessKeyId: configService.get('ACCESSKEY_ID'),
      secretAccessKey: configService.get('SECRETACCESSKEY'),
      region: configService.get('REGION'),
    });
  }

  upload(bucket: string, key: string, file: any, type: string) {
    return this.s3
      .putObject({
        Bucket: bucket,
        Key: key,
        Body: file,
        ContentType: type,
        ACL: 'public-read',
      })
      .promise();
  }
  delete(bucket: string, key: string) {
    return this.s3
      .deleteObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();
  }
}
