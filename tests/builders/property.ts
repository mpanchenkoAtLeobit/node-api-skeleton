import * as Factory from 'factory';
import {IProperty, IPropertyUpsertData} from '../../src/models/property';

export const PropertyUpsertDataBuilder = Factory.Sync.makeFactory<IPropertyUpsertData>({
    text: 'Test text',
});

export const PropertyBodyBuilder = Factory.Sync.makeFactory<IProperty>({
    id: 1,
    text: 'Test text',
});


