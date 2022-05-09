import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({example: 'admin', description:'Название роли'})
  @IsString({message:'Должно быть строковым значением'})
  readonly title: string;
}