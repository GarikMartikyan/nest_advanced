import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    MovieModule,
    ReviewModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
