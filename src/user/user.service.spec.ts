import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma.service';
import TestUtil from '../common/teste/TestUtil';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockPrismaService.user.create.mockReset();
    mockPrismaService.user.update.mockReset();
    mockPrismaService.user.delete.mockReset();
    mockPrismaService.user.findUnique.mockReset();
    mockPrismaService.user.findMany.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all users', async () => {
      const user = TestUtil.giveMeValidUser();

      mockPrismaService.user.findMany.mockReturnValue([user, user]);

      const users = await service.findAll();

      expect(mockPrismaService.user.findMany).toHaveBeenCalledTimes(1);

      expect(users).toHaveLength(2);
    });
  });

  describe('findUserById', () => {
    it('should find a existing user', async () => {
      const user = TestUtil.giveMeValidUser();

      mockPrismaService.user.findUnique.mockReturnValue(user);

      const userById = await service.findUserById(String(user.id));

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledTimes(1);

      expect(userById).toMatchObject(user);
    });
  });
});
