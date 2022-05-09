import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Film } from "./entities/films.entity";
@Module({
  providers: [FilmsService],
  controllers: [FilmsController],
  imports: [TypeOrmModule.forFeature([User, Film])]
})
export class FilmsModule {}
