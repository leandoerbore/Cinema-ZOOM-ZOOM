import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from "./database.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Producer } from "./entities/producers.entity";
import { Actor } from "./entities/actors.entity";
import { Cinema } from "./entities/cinemas.entity";
import { Genre } from "./entities/genres.entity";
import { Hall } from "./entities/halls.entity";

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
  imports: [TypeOrmModule.forFeature([Producer, Actor, Cinema, Genre, Hall])]
})
export class DatabaseModule {}
