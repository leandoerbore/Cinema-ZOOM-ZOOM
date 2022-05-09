import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { LoginUserDto } from "./DTO/login-user.dto";
import { AddUserDto } from "./DTO/add-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { User } from "../users/entities/user.entity";
import { RolesService } from "../roles/roles.service";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService,
              private rolesService: RolesService) {}

  async login(loginUserDto:LoginUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(loginUserDto)
    return this.generateToken(user)
  }

  async registration(addUserDto:AddUserDto): Promise<{ token: string }> {
    const candidate = await this.usersService.getUserByEmail(addUserDto.email)
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(addUserDto.password, 5)
    const user = await this.usersService.addUser({... addUserDto, password: hashPassword})
    return this.generateToken(user)
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(userDto.email)
    if (!user) {
      throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: 'Некорректный email или пароль'})
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const userRoles = await this.rolesService.getRolesByIds(user.roles)
    const payLoad = {email: user.email, id: user.id, roles: userRoles}
    return {
      token: this.jwtService.sign(payLoad)
    }
  }

  async getId(bearer: string){
    const token = bearer.split(' ')[1]
    const user = this.jwtService.decode(token)
    return user['id']
  }
}
