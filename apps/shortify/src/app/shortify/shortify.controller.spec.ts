import { Test, TestingModule } from '@nestjs/testing';
import { ShortifyController } from './shortify.controller';
import { ShortifyService } from './shortify.service';

describe('ShortifyController', () => {
  let controller: ShortifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortifyController],
      providers: [ShortifyService],
    }).compile();

    controller = module.get<ShortifyController>(ShortifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
