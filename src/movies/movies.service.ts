import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not Found`);
    }
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  create(movieData: CreateMovieDto) {
    const createdMovie = {
      id: this.movies.length + 1,
      ...movieData,
    };

    this.movies.push(createdMovie);
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
