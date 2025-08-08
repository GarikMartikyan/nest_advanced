import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find({
      order: {
        releaseYear: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    Object.assign(movie, updateMovieDto);

    return await this.movieRepository.save(movie);
  }

  async remove(id: number) {
    try {
      const movie = await this.findOne(id);
      await this.movieRepository.remove(movie);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
