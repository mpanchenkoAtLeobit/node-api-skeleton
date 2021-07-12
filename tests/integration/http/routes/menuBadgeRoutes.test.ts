import {HttpServer} from '../../../../app/http/httpServer';
import {Config} from '../../../../config';
import request from 'request';
import {OK} from 'http-status-codes';
import {Container} from 'typescript-ioc';
import {truncate} from '../../../utils/db';
import {tableNames} from '../../../../app/constants/tableNames';
import {KnexService} from '../../../../app/services/knexService';
import {MenuBadgeResource} from '../../../../app/resources/menuBadgeResource';
import {MenuBadgeUpsertDataBuilder} from '../../../builders';
import timekeeper from 'timekeeper';


describe('MenuBadgeRoutes', () => {
    const knexService = Container.get(KnexService);
    const knex = knexService.getClient();

    const menuBadgeResource = Container.get(MenuBadgeResource);

    const config = Container.get(Config);
    const httpServer = Container.get(HttpServer);
    const menuBadgeUrl = `http://localhost:${config.httpServer.port}/api/v1/menu_badge`;

    async function clearDB(): Promise<void> {
        await truncate(knex, [
            tableNames.MENU_BADGE
        ]);
    }

    beforeAll(async () => {
        await httpServer.start();

        timekeeper.freeze('2018-7-12 9:00:00');
    });

    afterAll(async () => {
        await httpServer.shutdown();
        Container.restore(MenuBadgeResource);
        await clearDB();
        timekeeper.reset();
    });

    beforeEach(async () => {
        await clearDB();
    });

    describe('GET /api/v1/menu_badge', () => {
        it('should return menu badges', async (done) => {
            await menuBadgeResource.create(MenuBadgeUpsertDataBuilder.build());
            const menuBadge = await menuBadgeResource.get({});

            request.get({url: menuBadgeUrl, json: true}, (error, response, body) => {
                expect(response.statusCode).toEqual(OK);

                expect(body).toEqual(JSON.parse(JSON.stringify(menuBadge)));
                done();
            });
        });
    });

    describe('GET /api/v1/menu_badge/{id}', () => {
        it('should return a menu badge', async (done) => {
            const menuBadgeBody = MenuBadgeUpsertDataBuilder.build();
            const [menuBadgeId] = await menuBadgeResource.create(menuBadgeBody);

            request.get({url: `${menuBadgeUrl}/${menuBadgeId}`, json: true}, async (error, response, body) => {
                expect(response.statusCode).toEqual(OK);
                const menuBadge = await menuBadgeResource.getOne({id: menuBadgeId});
                expect(JSON.parse(JSON.stringify(body))).toMatchObject(JSON.parse(JSON.stringify(menuBadge)));
                done();
            });
        });
    });

    describe('POST /api/v1/menu_badge', () => {
        it('should create new menu badge', async (done) => {
            const validBody = MenuBadgeUpsertDataBuilder.build();

            request.post({url: menuBadgeUrl, json: validBody}, async (error, response, body) => {
                expect(response.statusCode).toEqual(OK);

                const menuBadge = await menuBadgeResource.getOne({text: validBody.text});

                expect(menuBadge).toMatchObject(validBody);

                done();
            });
        });
    });

    describe('DELETE /api/v1/menu_badge/{id}', () => {
        it('should delete menu badge', async (done) => {
            await menuBadgeResource.create(MenuBadgeUpsertDataBuilder.build());
            const [menuBadge] = await menuBadgeResource.get({});

            request.delete({url: `${menuBadgeUrl}/${menuBadge.id}`}, (error, response) => {
                expect(response.statusCode).toEqual(OK);

                done();
            });
        });
    });

});
