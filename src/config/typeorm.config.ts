import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export async function getTypeOrmConfig(
  configService: ConfigService,
): Promise<TypeOrmModule> {
  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: configService.getOrThrow<string>('POSTGRES_PORT'),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
  };
}
