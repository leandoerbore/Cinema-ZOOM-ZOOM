import { forwardRef, Module } from "@nestjs/common";
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/roles.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => AuthModule)],
  exports: [RolesService]
})
export class RolesModule {}
