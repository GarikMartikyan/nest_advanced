import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { ActorService } from '../actor/actor.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly actorService: ActorService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { actorIds, ...movieData } = createMovieDto;
    console.log(actorIds);
    const actors = await this.actorService.findAll({
      where: { id: In(actorIds) },
    });

    if (!actors || actors.length !== actorIds.length) {
      console.log(actors);
      throw new NotFoundException(`One or more actors not found`);
    }

    const movie = this.movieRepository.create({ ...movieData, actors });
    return await this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find({
      where: {
        isAvailable: true,
      },
      order: {
        releaseYear: 'DESC',
      },
    });
  }

  async findOne(id: string) {
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

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    Object.assign(movie, updateMovieDto);

    return await this.movieRepository.save(movie);
  }

  async remove(id: string) {
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
