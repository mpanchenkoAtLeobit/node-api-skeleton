import jestMock from 'jest-mock';

// tslint:disable-next-line
export function createMock(cl: any): any {
    const metadata = jestMock.getMetadata(cl);
    if (!metadata) throw new Error('Failed to create mock');
    return jestMock.generateFromMetadata(metadata);
}

export function resetMocks() {
    jest.resetAllMocks();
    jestMock.clearAllMocks();
}
