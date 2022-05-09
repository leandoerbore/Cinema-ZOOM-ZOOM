import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddActorDto {
  @ApiProperty({example: '1', description:'Id актера'})
  readonly id?: number;

  @ApiProperty({example: 'Тоби Магуайр', description:'Имя актера'})
  @IsString({message: 'Должно быть строковым значением'})
  readonly names: string;
}