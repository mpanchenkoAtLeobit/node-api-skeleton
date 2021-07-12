import { Container } from 'typescript-ioc';
import { PropertyResource } from '../resources/propertyResource';
import { createMock, resetMocks } from '../../tests/utils/mock';
import { PropertyUpsertDataBuilder } from '../../tests/builders';
import { PropertyController } from './propertyController';

describe('PropertyController', () => {
  Container.snapshot(PropertyResource);
  Container.bind(PropertyResource).to(createMock(PropertyResource));

  const propertyController = Container.get(PropertyController);
  const propertyResourceMock = Container.get(PropertyResource);

  beforeEach(resetMocks);

  afterAll(function () {
    resetMocks();
    //Container.restore(PropertyResource);
  });

  describe('create', () => {
    it('should create property', async () => {
      const propertyId = 1;
      const propertyBody = PropertyUpsertDataBuilder.build();

      propertyResourceMock.createAndReturn = jest.fn().mockImplementation(() => [propertyId]);

      await propertyController.create(propertyBody);

      expect(propertyResourceMock.createAndReturn).toHaveBeenCalledWith({
        text: propertyBody.text,
      });
    });
  });
});
