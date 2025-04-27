import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsongService } from './playlistsong.service';

describe('PlaylistsongService', () => {
  let service: PlaylistsongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistsongService],
    }).compile();

    service = module.get<PlaylistsongService>(PlaylistsongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
