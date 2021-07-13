import {HttpServer} from '../../../../src/http/httpServer';
import {Config} from '../../../../config';
import request from 'request';
import {OK} from 'http-status-codes';
import {Container} from 'typescript-ioc';
import {truncate} from '../../../utils/db';
import {tableNames} from '../../../../src/constants/tableNames';
import {KnexService} from '../../../../src/services/knexService';
import {PropertyResource} from '../../../../src/resources/propertyResource';
import {PropertyUpsertDataBuilder} from '../../../builders';
import timekeeper from 'timekeeper';


describe('PropertyRoutes', () => {
    const knexService = Container.get(KnexService);
    const knex = knexService.getClient();
 
    const propertyResource = Container.get(PropertyResource);

    const config = Container.get(Config);
    const httpServer = Container.get(HttpServer);
    const propertyUrl = `http://localhost:${config.httpServer.port}/api/v1/property`;

    async function clearDB(): Promise<void> {
        await truncate(knex, [
            tableNames.Properties
        ]);
    }

    beforeAll(async () => {
        await httpServer.start();

        timekeeper.freeze('2018-7-12 9:00:00');
    });

    afterAll(async () => {
        await httpServer.shutdown();
        Container.restore(PropertyResource);
        await clearDB();
        timekeeper.reset();
    });

    beforeEach(async () => {
        await clearDB();
    });

    describe('GET /api/v1/property', () => {
        it('should return menu badges', async (done) => {
            await propertyResource.create(PropertyUpsertDataBuilder.build());
            const property = await propertyResource.get({});

            request.get({url: propertyUrl, json: true}, (error, response, body) => {
                expect(response.statusCode).toEqual(OK);

                expect(body).toEqual(JSON.parse(JSON.stringify(property)));
                done();
            });
        });
    });

    describe('GET /api/v1/property/{id}', () => {
        it('should return a menu badge', async (done) => {
            const propertyBody = PropertyUpsertDataBuilder.build();
            const [propertyId] = await propertyResource.create(propertyBody);

            request.get({url: `${propertyUrl}/${propertyId}`, json: true}, async (error, response, body) => {
                expect(response.statusCode).toEqual(OK);
                const property = await propertyResource.getOne({id: propertyId});
                expect(JSON.parse(JSON.stringify(body))).toMatchObject(JSON.parse(JSON.stringify(property)));
                done();
            });
        });
    });

    describe('POST /api/v1/property', () => {
        it('should create new menu badge', async (done) => {
            const validBody = PropertyUpsertDataBuilder.build();

            request.post({url: propertyUrl, json: validBody}, async (error, response, body) => {
                expect(response.statusCode).toEqual(OK);

                const property = await propertyResource.getOne({text: validBody.text});

                expect(property).toMatchObject(validBody);

                done();
            });
        });
    });

    describe('DELETE /api/v1/property/{id}', () => {
        it('should delete menu badge', async (done) => {
            await propertyResource.create(PropertyUpsertDataBuilder.build());
            const [property] = await propertyResource.get({});

            request.delete({url: `${propertyUrl}/${property.id}`}, (error, response) => {
                expect(response.statusCode).toEqual(OK);

                done();
            });
        });
    });

});
