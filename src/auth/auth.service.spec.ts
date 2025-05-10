import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/session/session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});

const mockJwtService = () => ({
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
});

const mockSessionService = () => ({
  createSession: jest.fn(),
});
jest.mock('bcryptjs');
describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;
  let sessionService: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
        { provide: SessionService, useFactory: mockSessionService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    sessionService = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should throw error if user already exists', async () => {
      const dto = { email: 'test@example.com', password: '123456' } as any;
      userRepository.findOne = jest.fn().mockResolvedValue({ id: 1, email: dto.email });
  
      await expect(service.registerUser(dto)).rejects.toEqual('da ton tai');
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
    });
  
    it('should hash password and create a new user', async () => {
      const dto = { email: 'test@example.com', password: '123456' } as any;
      const hash = 'hashedpassword';
      const createdUser = { id: 1, email: dto.email, password: hash };
  
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hash as never);
      userRepository.create = jest.fn().mockReturnValue(createdUser);
  
      const result = await service.registerUser(dto);
  
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...dto,
        password: hash,
      });
      expect(result).toEqual(createdUser);
    });
  });
  

  describe('loginUser', () => {
    it('should return message if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      const result = await service.loginUser({
        email: 'notfound@test.com', password: '123',
        
      });
      expect(result).toEqual({ message: 'User not found' });
    });

    it('should return message if password is invalid', async () => {
      const user = { email: 'a@a.com', password: bcrypt.hashSync('123456', 10) };
      userRepository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.loginUser({
        email: 'a@a.com', password: 'wrong',
      
      });
      expect(result).toEqual({ message: 'Invalid password' });
    });

    it('should return access and refresh token if login is successful', async () => {
      const user = { id: 1, email: 'a@a.com', password: bcrypt.hashSync('123456', 10) };
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      jwtService.signAsync = jest.fn().mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

      const result = await service.loginUser({ email: user.email, password: '123456', });

      expect(result).toHaveProperty('accessToken', 'access-token');
      expect(result).toHaveProperty('refreshToken', 'refresh-token');
      expect(result).toHaveProperty('message', 'Login successful');
    });
  });

  describe('refreshToken', () => {
    it('should return message if refresh token is invalid', async () => {
      jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error());

      const result = await service.refreshToken({ refresh_token: 'invalid' });
      expect(result).toEqual({ message: 'Invalid refresh token' });
    });

    it('should return message if user not found', async () => {
      jwtService.verifyAsync = jest.fn().mockResolvedValue({ id: 1 });
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      const result = await service.refreshToken({ refresh_token: 'valid' });
      expect(result).toEqual({ message: 'User not found' });
    });

    it('should return new access and refresh tokens', async () => {
      const user = { id: 1, email: 'test@example.com' };
      jwtService.verifyAsync = jest.fn().mockResolvedValue({ id: user.id });
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      jwtService.signAsync = jest.fn().mockResolvedValueOnce('new-access').mockResolvedValueOnce('new-refresh');
      userRepository.update = jest.fn();

      const result = await service.refreshToken({ refresh_token: 'valid' });

      expect(result).toEqual({ accessToken: 'new-access', refreshToken: 'new-refresh' });
    });
  });
});
