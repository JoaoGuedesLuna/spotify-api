import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
        path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
        path.resolve(process.cwd(), '.env.local'),
        path.resolve(process.cwd(), '.env')
      ]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DB')
      })
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
