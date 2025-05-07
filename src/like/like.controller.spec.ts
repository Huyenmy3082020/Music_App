import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'role/role.guard';
import { Roles } from 'role/role.decorator';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { LikeCreateDto } from './dto/create_likedto';

describe('LikeController', () => {
  let controller: LikeController;
  let likeService: LikeService;

  beforeEach(async () => {
    // Mock LikeService
    const mockLikeService = {
      createLike: jest.fn(),
      getLike: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: mockLikeService,
        },
      ],
    }).compile();

    controller = module.get<LikeController>(LikeController);
    likeService = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLike', () => {
    it('should call createLike from LikeService and return data', async () => {
      // Mock data
      const likeCreateDto = { postId: 1, songId: 1, created_at: new Date(), updated_at: new Date(), isActive: true };
      const userId = 1;
      const responseData = { id: 1, postId: 1, userId };

      // Setup mock service response
      likeService.createLike = jest.fn().mockResolvedValue(responseData);

      // Mock request object
      const req = { user_data: { id: userId } };

      // Call the controller method
      const result = await controller.createLike(likeCreateDto, req);

      // Assertions
      expect(likeService.createLike).toHaveBeenCalledWith(likeCreateDto, userId);
      expect(result).toEqual(responseData);
    });

    it('should handle errors correctly', async () => {
      // Mock data
      const likeCreateDto = { postId: 1, songId: 1, created_at: new Date(), updated_at: new Date(), isActive: true };
      const userId = 1;

      // Setup mock service to throw an error
      likeService.createLike = jest.fn().mockRejectedValue(new Error('Error creating like'));

      // Mock request object
      const req = { user_data: { id: userId } };

      // Check if the error is handled correctly
      await expect(controller.createLike(likeCreateDto, req)).rejects.toThrowError('Error creating like');
    });
  });

  describe('getLike', () => {
    it('should call getLike from LikeService and return data', async () => {
      // Mock userId
      const userId = 1;
      const responseData = [{ postId: 1, userId }];

      // Setup mock service response
      likeService.getLike = jest.fn().mockResolvedValue(responseData);

      // Mock request object
      const req = { user_data: { id: userId } };

      // Call the controller method
      const result = await controller.getLike(req);

      // Assertions
      expect(likeService.getLike).toHaveBeenCalledWith(userId);
      expect(result).toEqual(responseData);
    });
  });
});
