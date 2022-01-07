import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  updateUser(id: string, data: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleted = await this.prisma.user.delete({
      where: { id: Number(id) },
    });

    return Boolean(deleted);
  }
}
