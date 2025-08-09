import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}
  async create(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);
    return await this.actorRepository.save(actor);
  }

  findAll(options?: FindManyOptions<ActorEntity>) {
    return this.actorRepository.find(options);
  }

  async findOne(id: string) {
    const actor = await this.actorRepository.findOne({ where: { id } });
    if (!actor) {
      throw new BadRequestException(`Actor with id ${id} not found`);
    }
    return actor;
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
