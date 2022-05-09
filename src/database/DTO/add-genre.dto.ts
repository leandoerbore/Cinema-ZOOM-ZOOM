import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddGenreDto {
  @ApiProperty({example: '1', description:'Id жанра'})
  readonly id?: number;

  @ApiProperty({example: 'Фантастика', description:'Название жанра'})
  @IsString({message: 'Должно быть строковым значением'})
  readonly title: string;
}