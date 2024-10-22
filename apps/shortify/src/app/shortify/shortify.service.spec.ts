import { Test, TestingModule } from '@nestjs/testing';
import { ShortifyService } from './shortify.service';

describe('ShortifyService', () => {
  let service: ShortifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortifyService],
    }).compile();

    service = module.get<ShortifyService>(ShortifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
