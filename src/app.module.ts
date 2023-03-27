import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// class 위의 함수, decorator
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
