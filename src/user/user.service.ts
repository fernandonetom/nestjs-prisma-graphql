import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
