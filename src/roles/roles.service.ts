import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { AddRoleDto } from './DTO/add-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async addRole(addRoleDto: AddRoleDto): Promise<String> {
    await this.roleRepository.insert(addRoleDto)
      .catch( () => {
        throw new HttpException('Неудалось добавить роль', HttpStatus.BAD_REQUEST)
      });
    return 'Added';
  }

  async removeRole(id: number): Promise<String> {
    const role = await this.getRoleById(id)
    await this.roleRepository.delete(id)
      .catch(() => {
        throw new HttpException('Невозможно удалить роль', HttpStatus.BAD_REQUEST)
      });
    return 'Deleted';
  }

  async updateRole(id: number,addRoleDto: AddRoleDto): Promise<String> {
    const role = this.getRoleById(id)
    await this.roleRepository.update(id, addRoleDto).catch( () => {
      throw new HttpException('Неудалось обновить роль', HttpStatus.BAD_REQUEST)
    })
    return 'Updated'
  }

  async getRolesByIds(ids: number[]): Promise<Role[]> {
    return await this.roleRepository.findByIds(ids)
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.find()
    if (roles === undefined){
      throw new HttpException('Роли не найдены', HttpStatus.NOT_FOUND)
    }
    return roles
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({where: {
      title: value,
      }})
    if (role === undefined){
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND)
    }

    return role
  }

  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne(id)
    if (role === undefined){
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND)
    }

    return role
  }
}
