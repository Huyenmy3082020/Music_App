import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsongController } from './playlistsong.controller';

describe('PlaylistsongController', () => {
  let controller: PlaylistsongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistsongController],
    }).compile();

    controller = module.get<PlaylistsongController>(PlaylistsongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
