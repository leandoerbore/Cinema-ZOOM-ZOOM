import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRoleDto {
  @ApiProperty({example: '1', description:'Id пользователя'})
  @IsNumber({},{message: 'Должно быть числом'})
  readonly userId: number;

  @ApiProperty({example: '1', description:'Id роли'})
  @IsNumber({},{message: 'Должно быть числом'})
  readonly roleId: number;
}