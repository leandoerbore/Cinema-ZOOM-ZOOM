import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class LoginUserDto {
  @ApiProperty({example: 'pope@gmail.com', description:'Почта юзера'})
  @IsEmail({},{message: 'Некорректный email'})
  readonly email: string;

  @ApiProperty({example: 'pope_lord', description:'Пароль пользователя'})
  @Length(4, 20, {message: 'Не меньше 4 и не больше 20'})
  readonly password: string;
}
