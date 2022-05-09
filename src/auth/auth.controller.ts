import { Body, Controller, Get, Header, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddUserDto } from './DTO/add-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './DTO/login-user.dto';
import { Headers } from '@nestjs/common';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Авторизация пользователя'})
  @ApiResponse({status: 200, description: 'Авторизация прошла успешно'})
  @ApiResponse({status: 401, description: 'Ошибка авторизации'})
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status: 200, description: 'Регистрация прошла успешно'})
  @ApiResponse({status: 400, description: 'Пользователь с таким email существует'})
  @Post('/registration')
  async registration(@Body() addUserDto: AddUserDto): Promise<{ token: string }> {
    return await this.authService.registration(addUserDto);
  }

  @Get('/getId')
  @Header('Authorization', 'bearer')
  async getId(@Headers() headers: Headers) {
    return await this.authService.getId(headers['authorization'])
  }
}
