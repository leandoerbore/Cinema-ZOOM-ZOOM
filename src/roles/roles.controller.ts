import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { AddRoleDto } from "./DTO/add-role.dto";
import { Role } from "./entities/roles.entity";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: 'Добавить роль в бд'})
  @ApiResponse({status: 200, description: 'Роль успешно добавлена'})
  @ApiResponse({status: 400, description: 'Не удалось добавить роль в бд'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('add-role')
  async addRole(@Body() addRoleDto:AddRoleDto): Promise<String> {
    return await this.rolesService.addRole(addRoleDto)
  }

  @ApiOperation({summary: 'Удалить роль из бд'})
  @ApiResponse({status: 200, description: 'Роль успешно удалена'})
  @ApiResponse({status: 404, description: 'Роль не найдена'})
  @ApiResponse({status: 400, description: 'Невозможно удалить роль'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('delete-role/:id')
  async removeRole(@Param('id', ParseIntPipe) id: number): Promise<String> {
    return await this.rolesService.removeRole(id);
  }

  @ApiOperation({summary: 'Обновить роль'})
  @ApiResponse({status: 200, description: 'Роль успешно обновлена'})
  @ApiResponse({status: 404, description: 'Роль не найдена'})
  @ApiResponse({status: 400, description: 'Невозможно обновить роль'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Put('update-role/:id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() addRoleDto:AddRoleDto): Promise<String> {
    return await this.rolesService.updateRole(id, addRoleDto)
  }

  @ApiOperation({summary: 'Получить все роли'})
  @ApiResponse({status: 200, type: [Role],description: 'Роли успешно найдены'})
  @ApiResponse({status: 404, description: 'Роли не найдены'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('get-all-roles')
  async getAllRoles(): Promise<Role[]> {
    return await this.rolesService.getAllRoles()
  }

  @ApiOperation({summary: 'Получить роль по значению'})
  @ApiResponse({status: 200, type: Role,description: 'Роль успешно найдена'})
  @ApiResponse({status: 404, description: 'Роль не найдена'})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('get-role-by-value/:value')
  async getRoleByValue(@Param('value') value: string): Promise<Role> {
    return await this.rolesService.getRoleByValue(value)
  }
}
