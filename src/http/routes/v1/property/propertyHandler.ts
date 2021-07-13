import { Body, Controller, Delete, Get, OperationId, Post, Put, Response, Route, Security, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { PropertyController } from '../../../../controllers/propertyController';
import { PropertysValidator } from './propertyValidator';
import { IProperty, IPropertyUpsertData } from '../../../../models/property';
import { IErrorMessage } from '../../../../models';

@Route('v1/property')
@Tags('Property')
class PropertyHandler extends Controller {
  @Inject private controller!: PropertyController;
  @Inject private validator!: PropertysValidator;

  @Get()
  @OperationId('getPropertiesList')
  @Security('api_key')
  getList() {
    return this.controller.getList();
  }

  @Get('{id}')
  @OperationId('getProperty')
  @Security('api_key')
  get(id: string) {
    const propertyId = Number.parseInt(id, 10);
    this.validator.validateIdInput(propertyId);

    return this.controller.get(propertyId);
  }

  @Post()
  @OperationId('createProperty')
  @Security('api_key')
  @Response<IErrorMessage>(400, 'Bad request')
  create(@Body() body: IPropertyUpsertData): Promise<IProperty[]> {
    this.validator.validateCreateInput(body);

    return this.controller.create(body);
  }

  @Put('{id}')
  @OperationId('updateProperty')
  @Security('api_key')
  @Response<IErrorMessage>(400, 'Bad request')
  @Response<IErrorMessage>(404, 'Not found')
  update(id: string, @Body() body: IPropertyUpsertData): Promise<IProperty[]> {
    const propertyId = Number.parseInt(id, 10);
    this.validator.validateUpdateInput(propertyId, body);

    return this.controller.update(propertyId, body);
  }

  @Delete('{id}')
  @OperationId('deleteProperty')
  @Security('api_key')
  @Response<IErrorMessage>(404, 'Not found')
  delete(id: string): Promise<number[]> {
    const propertyId = Number.parseInt(id, 10);
    this.validator.validateIdInput(propertyId);

    return this.controller.delete(propertyId);
  }
}

export { PropertyHandler };
