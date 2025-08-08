import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { parseParamToInt } from '../common/utils/parseParamToInt';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = parseParamToInt(id);
    return this.movieService.findOne(parsedId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const parsedId = parseParamToInt(id);
    return this.movieService.update(parsedId, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = parseParamToInt(id);
    return this.movieService.remove(parsedId);
  }
}
