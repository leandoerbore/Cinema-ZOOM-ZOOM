import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddProducerDto {
  @ApiProperty({example: '1', description:'Id режиссера'})
  readonly id?: number;

  @ApiProperty({example: '1', description:'Имя режиссера'})
  @IsString({message: 'Должно быть строковым значением'})
  readonly name: string;
}