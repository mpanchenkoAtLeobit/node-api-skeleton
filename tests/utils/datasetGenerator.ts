export class DatasetGenerator {
    static getNonStringValues() {
        return [
            123,
            24.3456,
            {},
            null,
            undefined,
            [],
            new Date(),
            new RegExp('.'),
            true,
            false
        ];
    }

    static getNonNumberValues() {
        return [
            'string',
            {},
            null,
            undefined,
            [],
            new Date(),
            new RegExp('.'),
            true,
            false
        ];
    }

    static getNonIntegerValues() {
        return [
            24.3456,
            ...DatasetGenerator.getNonNumberValues()
        ];
    }

    static getNonPositiveIntegerValues() {
        return [
            -456,
            ...DatasetGenerator.getNonIntegerValues()
        ];
    }

    static getNonBooleanValues() {
        return [
            'string',
            123,
            24.3456,
            {},
            null,
            undefined,
            [],
            new Date(),
            new RegExp('.')
        ];
    }
}
