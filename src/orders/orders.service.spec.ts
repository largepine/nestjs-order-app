import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const createOrderDto = {
        user_id: 1,
        total_price: 100,
      };

      const saveMock = jest.fn().mockResolvedValue(createOrderDto);
      jest.spyOn(repository, 'save').mockImplementation(saveMock);

      const result = await service.createOrder(createOrderDto);

      expect(result).toEqual(createOrderDto);
      expect(saveMock).toHaveBeenCalledWith(expect.any(OrderEntity));
    });
  });
});
