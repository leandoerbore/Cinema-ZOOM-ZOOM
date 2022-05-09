import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { UpdateUserDto } from './DTO/update-user.dto';
import { User } from './entities/user.entity';
import { AddUserDto } from './DTO/add-user.dto';
import { AddUserFilmDto } from './DTO/add-user-film.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserRoleDto } from "./DTO/update-user-role.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService,) {}

  @ApiOperation({ summary: 'Получение всех зарегестрированных пользователей' })
  @ApiResponse({ status: 200, type: [User], description: 'Пользователи найдены' })
  @ApiResponse({status: 404, description: 'Пользователи не найдены'})
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Получение юзера по id' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь найден'})
  @ApiResponse({status: 404, description: 'Пользователь не найден'})
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Добавить юзера в бд' })
  @ApiResponse({ status: 200, type: String, description: 'Пользователь добавлен' })
  @ApiResponse({ status: 400, description: 'Невозможно добавить пользователя'})
  @Post('add-user')
  async addUser(@Body() addUserDto: AddUserDto): Promise<User> {
    return await this.userService.addUser(addUserDto);
  }

  @ApiOperation({ summary: 'Обновить данные юзера в бд' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse( {status: 404, description: 'Пользователь не найден'})
  @ApiResponse({status: 400, description: 'Невомзожно обновить данные пользователя'})
  @Put('update-user/:id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<String> {
    return await this.userService.updateUser(updateUserDto, id);
  }

  @ApiOperation({ summary: 'Удалить пользователя из бд' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
  @ApiResponse( {status: 400, description: 'Пользователя не существует'})
  @ApiResponse( {status: 403, description: 'Нет доступа'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Delete('delete-user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<String> {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Добавить фильмы пользователю' })
  @ApiResponse({ status: 200, description: 'Фильм успешно добавлен пользователю' })
  @ApiResponse({status: 400, description: 'Невозможно добавить фильм'})
  @Roles('user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post('add-user-film')
  async addUserFilms(@Body() addUserFilmDto: AddUserFilmDto) {
    return await this.userService.updateUserFilms(addUserFilmDto, false);
  }

  @ApiOperation({ summary: 'Удалить фильмы у пользователя' })
  @ApiResponse({ status: 200, description: 'Успешно удален' })
  @ApiResponse( {status: 400, description: 'Невозможно удалить фильм'})
  @Roles('user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Delete('remove-user-films')
  async removeUserFilms(@Body() addUserFilmDto: AddUserFilmDto) {
    return await this.userService.updateUserFilms(addUserFilmDto, true);
  }

  @ApiOperation({ summary: 'Получить фильмы пользователя' })
  @ApiResponse({ status: 200, type: [Number] })
  @ApiResponse( {status: 404, description: 'Пользователь не найден'})
  @Roles('user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get('get-user-films/:id')
  async getUserFilms(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserFilms(id);
  }

  @ApiOperation({summary: 'Добавить роли пользователю'})
  @ApiResponse( {status: 200, description: 'Роль успешно добавлена пользователю'})
  @ApiResponse({status: 404, description: 'Пользователь не найден'})
  @ApiResponse( {status: 400, description: 'Невозможно выдать роль пользователю'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post('add-user-role')
  async addUserRole(@Body() updateUserRoleDto:UpdateUserRoleDto): Promise<String> {
    return await this.userService.updateUserRole(updateUserRoleDto)
  }

  @ApiOperation({summary: 'Удалить роли у пользователя'})
  @ApiResponse( {status: 200, description: 'Роль успешно удалена у пользователя'})
  @ApiResponse( {status: 400, description: 'Невозможно удалить роль у пользователя'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Delete('remove-user-role')
  async removeUserRole(@Body() updateUserRoleDto:UpdateUserRoleDto): Promise<String> {
    return await this.userService.updateUserRole(updateUserRoleDto, true)
  }
}
