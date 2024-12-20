import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ListUsersController } from './list-users.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ListUsersQuery } from './list-users.query';
import { ListUsersHandler } from './list-users.handler';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CqrsModule, JwtModule],
  controllers: [ListUsersController],
  providers: [UserRepository, ListUsersQuery, ListUsersHandler],
})
export class ListUsersModule { }
